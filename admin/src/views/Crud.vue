<template>
  <div>
    <h3>文章列表</h3>
    <avue-crud
      v-dialogdrag
      :data="data"
      :option="option"
      @row-save="rowSave"
      @row-update="rowUpdate"
      @row-del="rowDel"
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
  option = {};

  async rowSave(form: any, done: Function, loading: Function) {
    loading();
    const { title, content, cover, author, $type, $origin } = form;
    const data = {
      title,
      content,
      cover,
      author,
      type: radioData.find((i) => $type === i.label)?.value,
      origin: oRadioData.find((i) => $origin === i.label)?.value,
    };
    const { status } = await this.$http.post(`/api/${this.resource}`, data);
    console.log(status);
    if (status === 200) {
      this.$message.success("添加成功");
      this.fetch();
    }
    done(form);
  }
  refresh() {
    this.fetch();
  }
  async rowDel(row: any) {
    // this.$message.success("删除数据" + JSON.stringify(form));
    const { status } = await this.$http.delete(
      `/api/${this.resource}/${row._id}`
    );
    if (status === 200) {
      this.$message.success("删除成功");
      this.fetch();
    }
  }
  async rowUpdate(row: any, index: Number, done: Function, loading: Function) {
    const { title, content, cover, author, $type, $origin } = row;
    const data = {
      title,
      content,
      cover,
      author,
      type: radioData.find((i) => $type === i.label)?.value,
      origin: oRadioData.find((i) => $origin === i.label)?.value,
    };
    const { status } = await this.$http.put(
      `/api/${this.resource}/${row._id}`,
      data
    );
    console.log(status);

    if (status === 200) {
      this.$message.success("修改成功");
      this.fetch();
    }
    done(data);
  }

  async fetch() {
    const { status, data } = await this.$http.get(`/api/${this.resource}`);
    if (status === 200) this.data = data.data;
  }

  async fetchOpeion() {
    const { status, data } = await this.$http.get(
      `/api/${this.resource}/option`
    );
    if (status === 200) this.option = data;
  }

  created() {
    this.fetch();
    this.fetchOpeion();
  }
}
</script>

<style scoped>
</style>
