import axios from "axios"

const IP="http://127.0.0.1:5000"

axios.defaults.baseURL=IP

//头像图片上传
export var  HEAD_IMG=IP+"/users/avatar_upload"

//商品图片上传
export var GOODS_IMG=IP+"/goods/goods_img_upload"

//获取商品图片
export var GET_GOODS=IP+"/upload/imgs/goods_img/"

//店铺图片上传
export var STORE_IMG=IP+"/shop/upload"

//获取店铺头像
export var STORE_HEAD=IP+"/upload/shop/"

//封装函数
//login 登录界面  account用户   password 密码

export var login=(account,password)=> axios.post("/users/checkLogin",{account,password})

//添加账号  newuser  account 用户 password 密码  userGroup用户组

export var adduser =(account,password,userGroup)=>axios.post("/users/add",{account,password,userGroup})
  


//获取账号列表  userlist  currentPage 当前页面  pageSize每页条数
export  var userlist=(currentPage,pageSize)=>axios.get("/users/list",{params:{currentPage,pageSize}})
//删除账号  id 账号id
export  var deluser=(id)=>axios.get("/users/del",{params:{id}})
//批量删除  ids 账号数组
export  var batchdeluser=(ids)=>axios.get("/users/batchdel",{params:{ids}})
//修改账号   id 账号id  account 用户   userGroup用户组
export var amenduser=(id,account,userGroup)=>axios.post("/users/edit",{id,account,userGroup})




//检查密码是否正确  changepwd  oldPwd 旧密码  id 账号id
export var checkpwd =(oldPwd,id)=>axios.get("/users/checkoldpwd",{params:{oldPwd,id}})
//修改密码 
export var amendpwd=(newPwd,id)=>axios.post("/users/editpwd",{newPwd,id})


//个人账号  account  id 账号id
export var account=(id)=>axios.get("/users/accountinfo",{params:{id}})



//头像上传
export var headport=(id)=>axios.post("/users/avatar_upload",{id})




//验证token是否在有效期
export var checktoken=(token)=> axios.get("/users/checktoken",{params:{token}})




//商品管理模块
//添加分类 addlist cateName//分类名称  state //是否启用
export var addgclass=(cateName,state)=>axios.post("/goods/addcate",{cateName,state})

//获取分类class currentPage//当前页  pageSize //每页条数

export var classgoods=(currentPage, pageSize)=>axios.get("/goods/catelist",{params:{currentPage, pageSize}})

//删除分类class 
export var removeclass=(id)=>axios.get("/goods/delcate",{params:{id}})


//修改分类 class  cateName分类名称  state分类状态
export var amendclass=(id,cateName,state)=>axios.post("/goods/editcate",{id,cateName,state})

//查询商品分类
export var queryclass=()=>axios.get("/goods/categories")


//图片上传接口 //没有参数
export var goodsimg=()=>axios.post("/goods/goods_img_upload")



//添加商品 addgoods name商品名称  category商品分类 price商品价格  imgUrl商品图片地址   goodsDesc商品描述
 export var addgoods=(name,category,price,imgUrl,goodsDesc)=>axios.post("/goods/add",{
    name,category,price,imgUrl,goodsDesc
 })

//获取商品列表  list currentPage//当前页  pageSize //每页条数
export var goodslist =(currentPage,pageSize)=>axios.get("/goods/list",{params:{currentPage,pageSize}})

//删除商品 list 
export var delgoods=(id)=>axios.get("/goods/del",{params:{id}})

//修改商品  list  id 商品id name商品名称  category商品分类 price商品价格  imgUrl商品图片地址   goodsDesc商品描述
// export var editgoods=(name,category,price,imgUrl,goodsDesc,id)=>axios.post("/goods/edit",{
//     name,category,price,imgUrl,goodsDesc,id
// })

export var editgoods=(params)=>axios.post("/goods/edit",params)





//订单管理模块 currentPage当前页  pageSize每页条数  orderNo订单号 consignee收货人  phone手机号 orderState订单状态  date时间范围
//获取订单
export var getorderinfo=(params)=>axios.get("/order/list",{params})

//查询订单
export var queryorderinfo=(currentPage,pageSize,orderNo,consignee,phone,orderState,date)=>axios.get("/order/search",{params:{currentPage,pageSize,orderNo,consignee,phone,orderState,date}})


//订单详情
export var orderdetails=(id)=>axios.get("/order/detail",{params:{id}})

//修改订单 orderNo 下单订单号  orderTime 下单时间 phone 电话 consignee收货人  deliverAddress送货地址 deliveryTime送达时间
//remarks备注 orderAmount订单金额  orderState订单状态
export var editorder=(params)=>axios.post("/order/edit",params)




//店铺管理
//店铺详情
export var shopdetail=()=>axios.get("/shop/info")



//店铺内容修改
export var editshop=(params)=>axios.post("/shop/edit",params)


//数据统计
//首页统计
export var homedata=()=>axios.get("/order/totaldata")
//订单统计
export var orderdata=(date)=>axios.get("/order/ordertotal",{params:{date}})