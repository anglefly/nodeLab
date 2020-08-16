<template>
  <div>
    <h3>{{isNew?'新建':'编辑'}}文章</h3>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
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
    // name: "",
    // desc: "",
  };
  rules = {
    name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
    desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
  };
  get isNew() {
    return !this.id;
  }
  submitForm(formName: string | number) {
    (this.$refs[formName] as Form).validate((valid: any) => {
      if (valid) {
        alert("submit!");
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }
  resetForm(formName: string | number) {
    (this.$refs[formName] as Form).resetFields();
  }
  created() {}
}
</script>

<style>
</style>