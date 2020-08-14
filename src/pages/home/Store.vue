<template>
  <div style="background-color:#fff">
    <div class="title">
      <h5>店铺管理</h5>
      <el-button type="primary" @click="saveinfo">保存</el-button>
    </div>
    <el-form ref="form" :model="form" label-width="80px" style="width:600px ;padding:20px">
      <el-form-item label="店铺名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="店铺公告">
        <el-input type="textarea" v-model="form.bulletin"></el-input>
      </el-form-item>
      <el-form-item label="店铺头像">
        <img width="145px" height="145px" :src="STORE_HEAD+form.avatar" />
        <el-upload :action="STORE_IMG" :show-file-list="false" :on-success="headonloadfinsh">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="店铺图片">
        <!-- <img
          style="margin-right:10px"
          width="145px"
          height="145px"
          
          v-for="item in form.pics"
          :key="item"
          :src="STORE_HEAD+item"
        /> -->
        <el-upload :action="STORE_IMG" :file-list="uploadimgdisplay"  list-type="picture-card" :on-success="imgonloadfinsh"  :on-remove="Removeimg">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="配送费">
        <el-input v-model="form.deliveryPrice"></el-input>
      </el-form-item>
      <el-form-item label="配送时间">
        <el-input v-model="form.deliveryTime"></el-input>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="店铺评分">
        <el-rate
          v-model="form.score"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
        ></el-rate>
      </el-form-item>
      <el-form-item label="销量">
        <el-input v-model="form.sellCount"></el-input>
      </el-form-item>
      <el-form-item label="活动">
        <el-checkbox-group v-model="form.supports">
          <el-checkbox :label="item" name="activity" v-for="item in activity" :key="item"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="营业时间">
        <el-time-picker
          is-range
          v-model="form.date"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { shopdetail, STORE_IMG, STORE_HEAD, editshop } from "@/api/apis";
import {changetime} from "@/utils/utils"
export default {
  data() {
    return {
      STORE_HEAD: "", //获取店铺头像图片
      STORE_IMG: "", //图片上传
      form: {
        avatar: "1597294428237.jpg",
        supports:[]
      },
      dialogImageUrl: "", //图片路径
      activity:["精彩大促满20-10","VC无限橙果汁全场8折","玉米浓浓堡上心","超美味配送满25-5","单人精彩套餐","买套餐送水果小吃"], //活动
      uploadimgdisplay:[]  //显示图片
    };
  },
  methods: {
    //保存信息
    saveinfo() {
      var newform = JSON.parse(JSON.stringify(this.form)); //深拷贝对象
      newform.supports = JSON.stringify(newform.supports);
      newform.date = JSON.stringify([changetime(newform.date[0]),changetime(newform.date[1])]);
      newform.pics = JSON.stringify(newform.pics);
      console.log(newform.pics)
      editshop(newform).then((res) => {
        if (res.data.code == 0) {
          this.$message("超美味点餐系统提示:" + res.data.msg);
        }
      });
    },
    //头像图片
    headonloadfinsh(res) {
      if (res.code == 0) {
        this.form.avatar = res.imgUrl;
        this.$message("超美味点餐系统提示:头像" + res.msg);
      }
    },
    //店铺图片
    imgonloadfinsh(res) {
      // console.log(res)
      if (res.code == 0) {
        this.form.pics.push(res.imgUrl)
        this.$message("超美味点餐系统提示:店铺图片添加成功");
      }
    },
    //删除图片
    Removeimg(res){
        //查找当前点击数据在整个图片数据中的索引并删除
        this.form.pics.splice(this.form.pics.indexOf(res.name),1)
    }

  },
  created() {
    this.STORE_HEAD = STORE_HEAD;
    this.STORE_IMG = STORE_IMG;
    shopdetail().then((res) => {
      // console.log(res.data)
      this.form = res.data.data;

      var arr=res.data.data.pics
      this.uploadimgdisplay=arr.map(item=>{
        return{
          name:item,
          url:STORE_HEAD+item
        }
      })
    });
  },
};
</script>

<style lang="less" scoped>
.title {
  border-bottom: 1px solid #eee;
  display: flex;
  h5 {
    line-height: 50px;
    text-indent: 10px;
    flex: 1;
    font-size: 16px;
  }
  .el-button--primary {
    height: 40px;
    margin: 10px 20px 0px 0px;
  }
}
/deep/.el-upload {
  width: 145px;
  border: 1px dashed #ccc;
  border-radius: 5px;
}
.el-icon-plus {
  font-size: 28px;
  color: #8c939d;
  width: 145px;
  height: 145px;
  line-height: 145px;
  text-align: center;
}
/deep/.el-form-item__content {
  display: flex;
}
</style>
