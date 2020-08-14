<template>
  <div class="change">
    <h5>修改密码</h5>
    <div style="width:400px;padding:20px;">
      <el-form el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="原密码">
          <el-input v-model="form.oldpassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="form.surepassword" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { checkpwd } from "@/api/apis";
import { amendpwd } from "@/api/apis";

export default {
  data() {
    return {
      form: {
        oldpassword: "",
        password: "",
        surepassword: "",
      },
    };
  },
  methods: {
    onSubmit() {
      // console.log(this.form.oldpassword,Number(localStorage.id))
      checkpwd(this.form.oldpassword, Number(localStorage.id)).then((res) => {
        if (res.data.code == "0") {
          amendpwd(this.form.password, Number(localStorage.id)).then((res) => {
            if (res.data.code == "0") {
              this.$message({
                message: res.data.msg ,
                type: "success",
              });
            }
          });
          this.$router.push("/");
        } else {
          this.$message(res.data.msg);
          this.form.oldpassword = "";
          this.form.password = "";
          this.form.surepassword = "";
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.change {
  background-color: #fff;
}
h5 {
  line-height: 50px;
  font-size: 16px;
  text-indent: 20px;
  border-bottom: 1px solid #eee;
}
</style>