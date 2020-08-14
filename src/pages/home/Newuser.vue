<template>
  <div>
    <h5>添加账号</h5>
    <div style="width:400px;padding:20px;">
      <el-form el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="用户组">
          <el-select v-model="groups" placeholder="请选择用户组">
            <el-option  v-for="(item,index) in grouplist" :key="index" :label="item.label" :value="item.group"></el-option>
            <!-- <el-option label="普通管理员" value="普通管理员" ></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {adduser }from "@/api/apis"
export default {
  data() {
    return {
      form: {
        name: "",
        password: "",
        
      },
      grouplist:[{
        label:"超级管理员",
        group:"超级管理员"
      },{
        label:"普通管理员",
        group:"普通管理员"
      }],
      groups:""
    };
  },
  methods: {
    onSubmit() {
      adduser(this.form.name,this.form.password,this.groups).then(res=>{
        if(res.data.code=="0"){
          this.$message({
          message:"超美味点餐系统提示:" +res.data.msg,
          type: 'Brand Color'
        });
        // this.$router.push("/")
         this.form.name="";
         this.form.password="";
         this.form.groups=""


        }else{
          this.$message.error('超美味系统提示:添加失败,稍后再试~');
        }
      });
    },
     resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
};
</script>

<style lang="less" scoped>
div {
  background-color: #fff;
}
h5{
    line-height: 50px;
    font-size:16px;
    text-indent: 20px;
    border-bottom: 1px solid #eee;
}
</style>