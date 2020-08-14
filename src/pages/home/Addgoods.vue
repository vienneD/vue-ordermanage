<template>
  <div style="background-color:#fff">
    <h5>商品添加</h5>
    <el-form ref="form" :model="form" label-width="80px" style="width:400px">
      <el-form-item label="商品名称">
        <el-input v-model="form.name" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select v-model="form.region" placeholder="请选择商品分类">
          <el-option v-for="(item,index) in goodsclass " :key="index" :value="item.cateName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格">
      <el-input-number v-model="form.price" :min=0></el-input-number>
      </el-form-item>
     <el-form-item label="商品图片">
      <el-upload
       :action="GOODS_IMG"
        list-type="picture-card"
        :on-success="handleAvatarSuccess"
        
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog >
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {queryclass,addgoods,GOODS_IMG} from "@/api/apis"
export default {
  data() {
    return {
      GOODS_IMG:"", //图片上传
      form: {
        name: "",
        region: "",
        price:"",
        desc: "",
      },
      //商品分类
      goodsclass:[{
        cateName:""
      }],
      dialogImageUrl: '',
      dialogVisible: false,
    };
  },
  methods: {
    //添加商品
    onSubmit() {
    //  console.log(this.form.name,this.form.region,this.form.price,this.form.desc)
    // console.log(this.form)
     addgoods(this.form.name,this.form.region,this.form.price,this.dialogImageUrl,this.form.desc).then(res=>{
      //  console.log(res)
       if(res.data.code==0){

          this.$message("超美味系统提示:"+res.data.msg);
          this.$router.push("/home/list")
          this.form.name="";
          this.form.price="";
          this.form.desc=""
          this.form.region=""
       }
     })

    },
     handleAvatarSuccess(res) {
       if(res.code==0){
         this.dialogImageUrl=res.imgUrl
       }
      },
      
  },
  created(){
    this.GOODS_IMG=GOODS_IMG
    //查询分类
    queryclass().then(res=>{
      this.goodsclass=res.data.categories
      this.form.region=this.goodsclass[0].cateName
      })
  }
};
</script>

<style lang="less" scoped>
h5 {
  line-height: 50px;
  text-indent: 10px;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  font-size: 16px;
}
</style>