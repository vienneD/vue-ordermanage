import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import {checktoken} from "@/api/apis"

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)



const router = new VueRouter({
  routes :[
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../pages/Home.vue'),
      
      //首页二级加载
      children:[{
        path: '/home/index',
        name: '/home/index',
        component: () => import('../pages/home/Index.vue'),
        meta:{breadlist:["后台首页"]}
      },{
        path: '/home/list',
        name: '/home/list',
        component: () => import('../pages/home/List.vue'),
        meta:{breadlist:["商品管理","商品列表"]}
        
      },
      {
        path: '/home/order',
        name: '/home/order',
        component: () => import('../pages/home/Order.vue'),
        meta:{breadlist:["订单管理"]}
      },
      {
        path: '/home/addgoods',
        name: '/home/addgoods',
        component: () => import('../pages/home/Addgoods.vue'),
        meta:{breadlist:["商品管理","商品添加"]}
      },
      {
        path: '/home/class',
        name: '/home/class',
        component: () => import('../pages/home/Class.vue'),
        meta:{breadlist:["商品管理","商品分类"]}
      },
      {
        path: '/home/store',
        name: '/home/store',
        component: () => import('../pages/home/Store.vue'),
        meta:{breadlist:["店铺管理"]}
      },
      {
        path: '/home/account',
        name: '/home/account',
        component: () => import('../pages/home/Account.vue'),
        meta:{breadlist:["账号管理","账号信息"]}
      },
      {
        path: '/home/newuser',
        name: '/home/newuser',
        component: () => import('../pages/home/Newuser.vue'),
        meta:{breadlist:["账号管理","添加账号"]}
      },
      {
        path: '/home/userlist',
        name: '/home/userlist',
        component: () => import('../pages/home/Userlist.vue'),
        meta:{breadlist:["账号管理","账号列表"]}

      },
      {
        path: '/home/changepwd',
        name: '/home/changepwd',
        component: () => import('../pages/home/Changepwd.vue'),
        meta:{breadlist:["账号管理","修改密码"]}

      },
      {
        path: '/home/commodity',
        name: '/home/commodity',
        component: () => import('../pages/home/Commodity.vue'),
        meta:{breadlist:["销售统计","订单统计"]}

      },
      {
        path: '/home/goods',
        name: '/home/goods',
        component: () => import('../pages/home/Goods.vue'),
        meta:{breadlist:["销售统计","商品统计"]}

      },
    ]
    }
  ]
})


// 路由拦截
router.beforeEach((to,from,next)=>{
 if(to.path!=="/"){
  //  console.log(localStorage.token)
  checktoken(localStorage.token).then(res=>{
    if(res.data.code=="0"){
      next()
    }else{
      next("/")
    }
  })
 }else{
   //下一步
   next()
 }
})






export default router
