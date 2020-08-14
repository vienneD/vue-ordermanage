<template>
  <el-container>
    <el-aside width="260px">
      <el-menu
        :default-active="hash"
        class="el-menu-vertical-demo"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#3A7DC3"
        router
        unique-opened
      >
        <h5>
          <i class="el-icon-dish"></i>
          <span>外卖商家中心</span>
        </h5>

        <el-menu-item index="/home/index">
          <i class="el-icon-s-home"></i>
          <span slot="title">后台首页</span>
        </el-menu-item>
        <el-menu-item index="/home/order">
          <i class="el-icon-document"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>
        <el-submenu index="/home/list ">
          <template slot="title">
            <i class="el-icon-s-goods"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/home/list">商品列表</el-menu-item>
            <el-menu-item index="/home/addgoods">商品添加</el-menu-item>
            <el-menu-item index="/home/class">商品分类</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-menu-item index="/home/store">
          <i class="el-icon-s-shop"></i>
          <span slot="title">店铺管理</span>
        </el-menu-item>
        <el-submenu index="/home/account">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span>账号管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/home/userlist">账号列表</el-menu-item>
            <el-menu-item index="/home/account">账号信息</el-menu-item>
            <el-menu-item index="/home/newuser">添加账号</el-menu-item>
            <el-menu-item index="/home/changepwd">修改密码</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/home/commodity">
          <template slot="title">
            <i class="el-icon-pie-chart"></i>
            <span>销售统计</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/home/commodity">商品统计</el-menu-item>
            <el-menu-item index="/home/goods">订单统计</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="flex:1; line-height:60px">
          <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>当日信息</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="user">
          <span>{{username}}</span>
          <img
            src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1743338427,2200622767&fm=26&gp=0.jpg"
          />
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {checktoken} from "@/api/apis"
export default {
  data() {
    return {
      hash: "",
      username: "",
    };
  },
  created() {
    // console.log(location.hash)
    this.hash = location.hash.substr(1);
    checktoken(localStorage.token).then(res=>{
      if(res.data.code=="0"){
        //成功
        this.username = localStorage.acc;
      }else{
        //失败
        this.username="请登录"
        this.$router.push="/"
      }
    })
      
    
  },
  methods: {
    
  },
};
</script>

<style lang="less" scoped>
@base: #304156;
.el-container {
  height: 100%;

  h5 {
    padding-top: 10px;
    //
    color: #fff;
    font-size: 20px;
    .el-icon-dish {
      width: 30px;
      line-height: 30px;
      background-color: #6ca5eb;
      border-radius: 50%;
      text-align: center;
      margin-left: 20px;
    }
  }
}

.el-header {
  background-color: #fff;
  display: flex;
  line-height: 60px;
}
.user {
  display: flex;
  margin-right: 20px;
  span {
    line-height: 50px;
    margin-right: 20px;
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-top: 5px;
  }
}
.el-menu {
  border: 0;
}

.el-aside {
  background-color: @base;
  overflow: visible;
}

.el-main {
  background-color: #e9eef3;
}
</style>
