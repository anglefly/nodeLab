<template>
  <div>
    <h3>文章列表</h3>
    <el-button type="primary" size="small" @click="$router.push(`edit`)">添加</el-button>
    <el-table :data="data.data">
      <el-table-column v-for="(col,name) in columns" :prop="name" :key="name" :label="col.label"></el-table-column>
      <el-table-column label="操作" :width="200">
        <!-- v-slot 里面可以写scope 通常可以解构 -->
        <template v-slot="{row}">
          <!-- $router.push 第一个参数 如果前面不加 / 则是当前路径下的同级路径跳转 加了即根路径跳转 -->
          <el-button type="text" icon="el-icon-edit" @click="$router.push(`edit/${row._id}`)"></el-button>
          <el-popconfirm title="确定删除吗？" @onConfirm="deleteThat(row._id)">
            <el-button slot="reference" type="text" icon="el-icon-delete" style="margin-left:24px"></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
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

  async deleteThat(id: string) {
    const { status } = await this.$http.delete(`/api/articles/${id}`);
    if (status === 200) {
      this.$message.success("删除成功");
      this.fetch();
    }
  }

  async fetch() {
    const { status, data } = await this.$http.get("/api/articles");
    if (status === 200) this.data = data;
  }

  created() {
    this.fetch();
  }
}
</script>

<style scoped>
</style>
