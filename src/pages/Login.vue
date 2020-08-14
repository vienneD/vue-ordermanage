<template>
  <div class="login">
    <div class="interface" @keyup.enter="clickLogin">
      <h3>超美味点餐管理系统登录</h3>
      <!-- <p> <i class="el-icon-user-solid" ></i>
      <input type="text"></p>-->
      <!-- <p> <i class="el-icon-lock" ></i> -->
      <el-input prefix-icon="el-icon-user-solid" v-model="acc"></el-input>
      <!-- <el-input prefix-icon="el-icon-lock" type="password"  show-password></el-input> -->
      <el-input prefix-icon="el-icon-lock" v-model="pwd" show-password ></el-input>
      <!-- </p> -->
      <p style="color:red">{{errorlogin}}</p>
      <el-button  @click="clickLogin" >登录</el-button>
    </div>
  </div>
</template>

<script>
import {login} from "@/api/apis"
export default {
  data() {
    return {
      acc: "",
      pwd: "",
      errorlogin:""
    };
  },
 methods:{
   clickLogin(){
       login(this.acc,this.pwd).then(res=>{
        //  console.log(res)
         if(res.data.code=="0"){
         //成功
         localStorage.token=res.data.token //存储本地token
         localStorage.role=res.data.role  //存储本地role
         localStorage.acc=this.acc  //存储用户名 
         localStorage.id=res.data.id  //存储id
         this.$router.push("/home/index")  //跳转到其他页面
         this.$message({
          message: '登录成功,欢迎使用超美味点餐管理系统',
          type: 'success'
        });
       }else{
         //失败
         this.errorlogin='登录失败,请重新输入'
       }
       })
   }
 }
};
</script>

<style lang="less" scoped>
.login {
  background:url("../assets/imgs/logo.jpg") no-repeat ;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  display:flex;
   justify-content: center;
   align-items: center;
}
.interface {
  width: 360px;
  height: 100px;
   
  h3 {
    font-size:26px;
    text-align: center;
    color: #333;
    // line-height: 40px;
  }
  .el-input {
    margin-top: 20px;
    border-radius: 3px;
     /deep/.el-input__inner{
      background-color:rgb(223, 219, 219) ;
      outline: none;
      text-indent: 5px;
      color:#161616;
    }
  
  }
  button {
    width: 100%;
    height: 40px;
    font-size:18px;
    margin-top: 20px;
    background-color: #db3b05;
    color: #fff;
    border: 0;
    border-radius: 3px;
    outline: none;
  }
}
</style>
