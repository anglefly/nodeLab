<template>
  <div>
    <avue-crud
      v-if="option.column"
      :data="data.data"
      :option="option"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
      :page.sync="page"
      @on-load="changePage"
      @sort-change="changeSort"
      @search-change="search"
    ></avue-crud>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({})
export default class resourceList extends Vue {
  @Prop(String) resource!: string;
  data: any = {};
  option: any = {};
  page: any = {
    total: 0
  };
  query: any = {
    limit: 2
  };
  async search(where: any, done: Function) {
    Object.keys(where).forEach(i => {
      const field = this.option.column.find((v: any) => v.prop === i);
      if (field && field.regx) where[i] = { $regex: where[i] };
    });
    this.query.where = where;
    this.fetch();
    done();
  }
  async changeSort({ prop, order }: { prop: any; order: any }) {
    if (!order) {
      this.query.sort = null;
    } else {
      this.query.sort = {
        [prop]: order === "ascending" ? 1 : -1
      };
    }
    this.fetch();
  }
  async changePage({
    pageSize,
    currentPage
  }: {
    pageSize: any;
    currentPage: any;
  }) {
    this.query.page = currentPage;
    this.query.limit = pageSize;
    this.fetch();
  }
  async fetch() {
    const res = await this.$http.get(`${this.resource}`, {
      params: {
        query: this.query
      }
    });
    this.page.total = res.data.total;
    this.data = res.data;
  }
  async fetchOption() {
    const res = await this.$http.get(`${this.resource}/options`);
    this.option = res.data;
  }
  async create(row: any, done: Function) {
    const res = await this.$http.post(`${this.resource}`, row);
    if (res.status === 201) {
      res &&
        this.$notify({
          title: "提示",
          message: "添加成功",
          type: "success"
        });
      this.fetch();
      done();
    } else {
      this.$message.error(res.data);
    }
  }
  async update(row: any, index: number, done: Function) {
    const data = JSON.parse(JSON.stringify(row));
    delete data.$index;
    const res = await this.$http.put(`${this.resource}/${data._id}`, data);
    if (res.status === 200) {
      this.$notify({
        title: "提示",
        message: "修改成功",
        type: "success"
      });
      this.fetch();
      done();
    } else {
      this.$message.error(res.data);
    }
  }
  remove(row: any) {
    this.$confirm(`是否永久删除课程：${row.name}`, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }).then(async () => {
      const res = await this.$http.delete(`${this.resource}/${row._id}`);
      if (res.status == 200) {
        this.$notify({
          title: "提示",
          message: "删除成功",
          type: "success"
        });
      } else {
        this.$message.error(res.data);
      }
      this.fetch();
    });
  }
  created() {
    this.fetchOption();
    this.fetch();
  }
}
</script>

<style>
</style>