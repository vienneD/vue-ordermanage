<template>
  <el-container>
    <el-aside width="220px">
      <el-menu
        :default-active="url"
        class="el-menu-vertical-demo"
        background-color="#ce6868"
        text-color="#fff"
        active-text-color="#ccc"
        router
        unique-opened
      >
        <h5>
          <i class="el-icon-dish"></i>
          <span>外卖商家中心</span>
        </h5>
        <div v-for="(item,index) in powerarr" :key="index">
          <el-menu-item v-if="!(item.children)" :index="item.hash">
            <i :class="item.fonts"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>

          <el-submenu v-else :index="item.hash ">
            <template slot="title">
              <i :class="item.fonts"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item-group v-for="(child,num) in item.children" :key="num">
              <el-menu-item :index="child.hash">{{child.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="flex:1; line-height:60px">
          <el-breadcrumb-item v-for="item in breadlist " :key="item" style="font-size:18px">{{item}}</el-breadcrumb-item>
          <!-- <el-breadcrumb-item>当日信息</el-breadcrumb-item> -->
        </el-breadcrumb>

        <div class="user" @click="usercenter" >
          <span style="font-size:20px;color:#555">{{username}}</span>
          <img
            :src="headurl"
            
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
import { checktoken,account } from "@/api/apis";
export default {
  data() {
    return {
      url: "",
      username: "",
      headurl:"",
      list: [
        {
          hash: "/home/index",
          fonts: "el-icon-s-home",
          name: "后台首页",
          role: ["super", "normal"],
        },
        {
          hash: "/home/order",
          fonts: "el-icon-document",
          name: "订单管理",
          role: ["super", "normal"],
        },
        {
          hash: "/home/list",
          fonts: "el-icon-s-goods",
          name: "商品管理",
          children: [
            {
              hash: "/home/list",
              name: "商品列表",
            },
            {
              hash: "/home/addgoods",
              name: "商品添加",
            },
            {
              hash: "/home/class",
              name: "商品分类",
            },
          ],
          role: ["super", "normal"],
        },
        {
          hash: "/home/store",
          fonts: "el-icon-s-shop",
          name: "店铺管理",
          role: ["super"],
        },
        {
          hash: "/home/account",
          fonts: "el-icon-user-solid",
          name: "账号管理",
          children: [
            {
              hash: "/home/userlist",
              name: "账号列表",
            },
            {
              hash: "/home/account",
              name: "账号信息",
            },
            {
              hash: "/home/newuser",
              name: "添加账号",
            },
            {
              hash: "/home/changepwd",
              name: "修改密码",
            },
          ],
          role: ["super"],
        },
        {
          hash: "/home/commodity",
          fonts: "el-icon-pie-chart",
          name: "销售统计",
          children: [
            {
              hash: "/home/commodity",
              name: "商品统计",
            },
            {
              hash: "/home/goods",
              name: "订单统计",
            },
          ],
          role: ["super"],
        },
      ],
      breadlist:[]
    };
  },
  //计算机属性
  computed: {
    powerarr() {
      return this.list.filter((item) => item.role.includes(localStorage.role));
    },
  },
  created() {
    this.headonload()
    // console.log(location.hash)
    // this.url = location.hash.substr(1);
    this.url =this.$route.path
    checktoken(localStorage.token).then((res) => {
      if (res.data.code == "0") {
        //成功
        this.username = localStorage.acc;
      } else {
        //失败
        this.username = "请登录";
        this.$router.push = "/";
      }
    });
    //接收通知
    this.$bus.$on("updatehead",()=>{
      this.headonload()
    });
    //加载时面包屑变化
    this.breadlist=this.$route.meta.breadlist

  },
  methods:{
    headonload(){
       //更新头像
       account(localStorage.id).then(res=>{
         this.headurl=res.data.accountInfo.imgUrl
       })
    },
    usercenter(){
      this.$router.push("/home/account")
    }
  },
  //监听hash变化
  watch:{
    $route(to){
      // console.log(to)
      this.breadlist=to.meta.breadlist
    }
  }
};
</script>

<style lang="less" scoped>
@base: #ce6868
;
.el-container {
  height: 100%;

  h5 {
    padding-top: 10px;
    //
    color: #fff;
    font-size: 20px;
    line-height: 50px;
    .el-icon-dish {
      width: 30px;
      line-height: 30px;
      background-color: #FF9900;
      border-radius: 50%;
      text-align: center;
      margin-left: 20px;
      margin-right:10px
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
.el-menu-item i{
 color:#fff;
}
.el-submenu__title i{
  color:#fff
}

</style>
