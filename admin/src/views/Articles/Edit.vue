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
      <el-form-item label="标题" prop="name">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="name">
        <el-input v-model="ruleForm.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Form } from "element-ui";

@Component({})
export default class Edit extends Vue {
  @Prop(String) id: string | undefined;
  data = {};
  ruleForm = {
    title: "",
    content: "",
  };
  rules = {
    title: [
      { required: true, message: "请输入标题", trigger: "blur" },
      { min: 3, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" },
    ],
    content: [{ required: true, message: "请填写内容", trigger: "blur" }],
  };
  get isNew() {
    return !this.id;
  }
  submitForm(formName: string) {
    (this.$refs[formName] as any).validate((valid: boolean) => {
      if (valid) {
        // alert("submit!");
        console.log(valid);
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