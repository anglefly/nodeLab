<template>
  <div>
    <h1>通用设置</h1>
    <avue-crud
      v-if="option.column"
      v-dialogdrag
      :page.sync="page"
      :data="data"
      :option="option"
      @row-save="rowSave"
      @row-update="rowUpdate"
      @row-del="rowDel"
      @on-load="onLoad"
      @sort-change="sortChange"
      @refresh-change="refresh"
      @search-change="search"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
const radioData = [
  {
    label: "普通文章",
    value: 1,
  },
  {
    label: "简历",
    value: 2,
  },
  {
    label: "管理员介绍",
    value: 3,
  },
];
const oRadioData = [
  {
    label: "原创",
    value: 1,
  },
  {
    label: "转载",
    value: 2,
  },
  {
    label: "混合",
    value: 3,
  },
];
@Component({})
export default class ResourceList extends Vue {
  @Prop(String) resource!: string;
  data = [];
  option: any = {};
  page: any = {
    total: 0,
    currentPage: 1,
  };
  query: any = {
    limit: 10, // 每页数量
    // where:{ // 指定参数查询
    //   _id:'xvxcvfdfds'
    // }
    // sort: {
    //   // 排序
    //   _id: -1, // -1 正序， 1 倒序
    // },
  };

  // 排序
  sortChange({ prop, order }: any) {
    if (!order) {
      this.query.sort = null;
    } else {
      this.query.sort = { [prop]: order === "ascending" ? -1 : 1 };
    }
  }

  // 搜索 查询
  search(where: any, done: Function) {
    // this.$message.success(JSON.stringify(item));
    // const where = JSON.parse(JSON.stringify(params));
    for (const key in where) {
      if (Object.prototype.hasOwnProperty.call(where, key)) {
        const field = this.option.column.find((i: any) => i.prop === key);
        if (field.regex) where[key] = { $regex: where[key] };
      }
    }
    console.log(where);

    this.query.where = where;
    this.fetch();
    done();
  }

  // 分页
  onLoad({ pageSize, currentPage }: any) {
    this.query.limit = pageSize;
    this.query.page = currentPage;
    this.fetch();
  }

  // 保存
  async rowSave(form: any, done: Function, loading: Function) {
    const data = { ...form };
    // for (const key in data) {
    //   if (Object.prototype.hasOwnProperty.call(data, key)) {
    //     const element = data[key];
    //     if (key.indexOf("$") > -1) delete data[key];
    //   }
    // }

    const { status } = await this.$http.post(`/${this.resource}`, data);
    console.log(status);
    if (status === 201) {
      this.$message.success("添加成功");
      this.fetch();
    }
    done(data);
    loading();
  }

  // 刷新
  refresh() {
    this.fetch();
  }

  // 删除
  rowDel(row: any) {
    this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        const { status } = await this.$http.delete(
          `/${this.resource}/${row._id}`
        );
        if (status === 200) {
          this.$message.success("删除成功");
          this.fetch();
        }
      })
      .catch(() => {});
  }

  // 更新
  async rowUpdate(row: any, index: Number, done: Function, loading: Function) {
    console.log(row);

    const data = { ...row };
    // for (const key in data) {
    //   if (Object.prototype.hasOwnProperty.call(data, key)) {
    //     const element = data[key];
    //     if (key.indexOf("$") > -1) delete data[key];
    //   }
    // }
    const { status } = await this.$http.put(
      `/${this.resource}/${row._id}`,
      data
    );
    if (status === 200) {
      this.$message.success("修改成功");
      this.fetch();
    }
    done(data);
  }

  // 获取数据
  async fetch() {
    const { status, data } = await this.$http.get(`/${this.resource}`, {
      params: {
        query: this.query,
      },
    });
    if (status === 200) {
      this.data = data.data;
      this.page.total = data.total;
    }
  }

  // 获取配置
  async fetchOpeion() {
    const { status, data } = await this.$http.get(`/${this.resource}/option`);
    if (status === 200) this.option = data;
  }

  created() {
    this.fetch();
    console.log(window.axios, Vue.prototype.$http);

    this.fetchOpeion();
  }
}
</script>

<style scoped>
</style>
