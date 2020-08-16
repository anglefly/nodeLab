<template>
  <div>
    <h3>文章列表</h3>
    <el-table :data="data.data">
      <el-table-column v-for="(col,name) in columns" :prop="name" :key="name" :label="col.label"></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class ArticleList extends Vue {
  data = {};

  columns = {
    _id: { label: "id" },
    title: { label: "标题" },
    content: { label: "内容" },
    cover: { label: "封面图" },
    author: { label: "作者" },
    // keyword: { label: "关键字" },
    // state: { label: "发布状态" },
    // origin: { label: "转载状态" },
    // tags1: { label: "标签" },
    // categories: { label: "分类" },
  };

  async fetch() {
    const res = await this.$http.get("articles");
    if (res.status === 200) this.data = res.data;
  }

  created() {
    this.fetch();
  }
}
</script>

<style scoped>
</style>
