<template>
  <div>
    <h3>课程列表，文件列表</h3>
    <el-button
      type="primary"
      size="small"
      @click="$router.push('/courses/create')"
      style="margin:10px 0"
    >添加</el-button>
    <el-table :data="data.data" border stripe>
      <el-table-column
        v-for="(field,name) in fields"
        :prop="name"
        :key="name"
        :label="field.label"
        :width="field.width"
      ></el-table-column>
      <el-table-column label="操作" :width="200">
        <template v-slot="{row}">
          <el-button
            type="success"
            size="small"
            @click="$router.push(`/courses/edit/${row._id}`)"
          >编辑</el-button>
          <el-button type="danger" size="small" @click="remove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class courseList extends Vue {
  data = {};
  fields = {
    _id: { label: "ID" },
    name: { label: "课程|文件名称" },
    cover: { label: "课程|文件封面图" }
  };
  async fetch() {
    const res = await this.$http.get("courses");
    this.data = res.data;
  }
  remove(row: any) {
    this.$confirm(`是否永久删除课程：${row.name}`, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }).then(async () => {
      await this.$http.delete(`courses/${row._id}`);
      this.$message.success("删除成功");
      this.fetch();
    });
  }
  created() {
    this.fetch();
  }
}
</script>

<style>
</style>