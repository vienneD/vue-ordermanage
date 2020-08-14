<template>
  <div style="background-color: #ffff; text-indent:20px ;padding:20px">
    <h5>管理员信息</h5>
    <p>管理员ID:{{accinfo.id}}</p>
    <p>账号:{{accinfo.account}}</p>
    <p>用户组:{{accinfo.userGroup}}</p>
    <p>创建时间:{{accinfo.ctime}}</p>
    <div style="display:flex">
      <span>管理员头像:</span>
      <img style="width: 200px; height: 200px; margin:20px 0px 0px 20px" :src="accinfo.imgUrl">
    
        <el-upload
          :action="HEAD_IMG"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :data="userdata"
        >
          <i  class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      
    </div>
  </div>
</template>

<script>
import { account,HEAD_IMG } from "@/api/apis";
import { changetime } from "@/utils/utils";
export default {
  data() {
    return {
      //上传头像图片
      HEAD_IMG:"",
      accinfo: {},
      userdata: {
        id: "",
      },
    };
  },

  created() {
    this.HEAD_IMG=HEAD_IMG
    this.headonload();
  },
  methods: {
    headonload() {
      // console.log(111111111)
      this.userdata.id = localStorage.id;
      account(Number(localStorage.id)).then((res) => {
        res.data.accountInfo.ctime = changetime(res.data.accountInfo.ctime);
        console.log(res.data.accountInfo)
        this.accinfo = res.data.accountInfo;
      });
    },
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        //发起通知
        this.$bus.$emit("updatehead");
        this.headonload();
      }
    },
  },
};
</script>

<style lang="less" scoped>
h5 {
  font-size: 16px;
}
p,
h5 {
  line-height: 40px;
  border-bottom: 1px solid #eee;
}
span:first-child {
  line-height: 200px;
}

/deep/ .el-upload {
   border: 1px dashed #ccc;
    width: 200px;
    height: 200px;
    margin-top: 20px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-indent: 0px;
}
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}
</style>