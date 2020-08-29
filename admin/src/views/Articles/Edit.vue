<template>
  <div>
    <h3>{{isNew?'新建':'编辑'}}文章</h3>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="标题">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="关键字">
        <el-input v-model="ruleForm.keyword"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="ruleForm.author"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="ruleForm.type">
          <el-radio :label="1">普通文章</el-radio>
          <el-radio :label="2">简历</el-radio>
          <el-radio :label="3">管理员介绍</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="转载状态">
        <el-radio-group v-model="ruleForm.origin">
          <el-radio :label="1">原创</el-radio>
          <el-radio :label="2">转载</el-radio>
          <el-radio :label="3">混合</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="ruleForm.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="$router.go(-1)">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Form } from "element-ui";

@Component({})
export default class Edit extends Vue {
  // 此处可以写成 @Prop(String) id!: string 否则ts报错
  @Prop(String) id: string | undefined;
  mounted() {
    if (this.id) this.getData();
  }
  ruleForm = {
    title: "",
    keyword: "", // 关键字
    author: "", // 作者
    type: 1, // 类型: 1: 普通文章，2: 简历，3: 管理员介绍
    origin: 1, // 转载状态: 1 原创，2 转载，3 混合
    content: "", // 内容
  };
  rules = {
    title: [
      { required: true, message: "请输入标题", trigger: "blur" },
      { min: 3, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" },
    ],
    content: [{ required: true, message: "请填写内容", trigger: "blur" }],
  };
  get isNew() {
    // 计算属性，get是ES6 语法本省就有的
    return !this.id;
  }
  // 获取编辑的数据
  async getData() {
    const { status, data } = await this.$http.get(`/api/articles/${this.id}`);
    if (status === 200) this.ruleForm = { ...this.ruleForm, ...data };
  }
  // 提交
  submitForm(formName: string) {
    (this.$refs[formName] as any).validate(async (valid: boolean) => {
      if (valid) {
        // alert("submit!");
        console.log(valid, this.ruleForm);
        const { status } = await this.$http[this.isNew ? "post" : "put"](
          `/api/articles/${this.id || ""}`,
          this.ruleForm
        );
        console.log(status);

        if (status === 200) {
          this.$message.success(this.isNew ? "添加成功" : "修改成功");
          this.$router.go(-1);
        }
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }
  resetForm(formName: string) {
    (this.$refs[formName] as Form).resetFields();
  }
  created() {}
}
</script>

<style>
</style>