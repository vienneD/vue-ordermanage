<template>
  <div>
    <h5>商品列表</h5>
    <el-table :data="tableData" :style="style">
      <!-- 商品里面详情 -->
      <el-table-column type="expand" v-loading="loading" element-loading-text="拼命加载中">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand" style="display: flex;">
            <div class="list-left">
              <el-form-item label="商品 ID">
                <span>{{ scope.row.id }}</span>
              </el-form-item>
              <el-form-item label="所属分类">
                <span>{{ scope.row.category }}</span>
              </el-form-item>
              <el-form-item label="商品图片">
                <template slot-scope="scope">
                  <img style="width: 100px; height: 100px" :src="GET_GOODS+scope.row.imgUrl" />
                </template>
              </el-form-item>
              <el-form-item label="商品评价">
                <span>{{ scope.row.rating }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ scope.row.goodsDesc }}</span>
              </el-form-item>
            </div>
            <div class="list-right">
              <el-form-item label="商品价格">
                <span>{{ scope.row.price }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ scope.row.ctime }}</span>
              </el-form-item>
              <el-form-item label="商品销量">
                <span>{{ scope.row.sellCount }}</span>
              </el-form-item>
            </div>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="所属分类" prop="category"></el-table-column>

      <el-table-column label="商品价格" prop="price"></el-table-column>

      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <img style="width: 100px; height: 100px" :src="GET_GOODS+scope.row.imgUrl" />
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="goodsDesc" width="220"></el-table-column>

      <el-table-column label="操作" prop="operation">
        <template slot-scope="scope">
          <el-button size="mini" @click="amendmsg(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 弹框 -->

    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="auto">
        <el-form-item label="商品名称">
          <el-input v-model="form.name" autocomplete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="所属分类">
          <el-select v-model="form.category" placeholder="请选择分组" style="width:300px">
            <el-option v-for="(item,index) in groupclass" :key="index" :value="item.cateName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.price" autocomplete="off" style="width:300px" :min=0></el-input>
        </el-form-item>
        <el-form-item label="商品图片">
          <!-- <div></div> -->
          <img :src="GET_GOODS+form.imgUrl" style="width:200px;height:200px" class="avatar" />
          <el-upload
            class="avatar-uploader"
            :action="GOODS_IMG"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            style="width: 200px;
                    line-height: 198px;
                    text-align: center;
                    border: 1px dashed #ccc;"
          >
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="form.goodsDesc" autocomplete="off" style="width:300px"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" style="display:flex;justify-content:flex-end">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  goodslist,
  editgoods,
  delgoods,
  queryclass,
  GOODS_IMG,
  GET_GOODS,
} from "@/api/apis";
//
import { changetime } from "@/utils/utils";
export default {
  data() {
    return {
      style:{},
      GET_GOODS: "", //获取图片
      GOODS_IMG: "", //图片上传
      loading: true,
      tableData: [],

      currentPage: 1,
      pagesize: 5,
      total: 0,
      id: 0,

      //弹框信息
      form: { },

      dialogTableVisible: false,
      dialogFormVisible: false,

      //分类
      groupclass: [
        {
          cateName: "",
        },
      ],
    };
  },
  methods: {
    //上传图片
    handleAvatarSuccess(res) {
      this.form.imgUrl = res.imgUrl;
    },
    //点击编辑显示弹窗
    amendmsg(scope) {
      this.dialogFormVisible = true;
      this.form = { ...scope };

      this.id = scope.id;
      //分类接口
      queryclass().then((res) => {
        // console.log(res)
        this.groupclass = res.data.categories;
      });
    },
    //发送修改信息
    handleEdit() {
      editgoods(this.form).then((res) => {
        if (res.data.code == 0) {
          this.$message("超美味点餐系统提示:" + res.data.msg);
          this.draw();
        }
      });
      this.dialogFormVisible = false;
    },

    //分页
    handleSizeChange(page) {
      // console.log(`每页 ${page} 条`);
      this.pagesize = page;
      this.draw();
      this.style={}
    },
    handleCurrentChange(page) {
      // console.log(`当前页: ${page}`);
      this.currentPage = page;
      this.draw();
      this.style={}
    },
    //渲染
    draw() {
      (this.loading = true),
        goodslist(this.currentPage, this.pagesize).then((res) => {
          // console.log(res.data.data[0].imgUrl);
          for (var key of res.data.data) {
            // console.log(key.ctime)
            key.ctime = changetime(key.ctime);
          }
          this.total = res.data.total;

          this.tableData = res.data.data;
          this.loading = false;
        });
    },
    //删除
    handleDelete(index, obj) {
      this.$confirm("此操作将删除该条数据, 是否继续?", "超美味点餐系统提示", {
        confirmButtonText: "确定删除",
        cancelButtonText: "再考虑考虑",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          delgoods(obj.id).then((res) => {
            if (res.data.code == "0") {
              this.draw();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.style="height:700px"
    this.GET_GOODS = GET_GOODS;
    this.GOODS_IMG = GOODS_IMG;
    this.draw();
  },
};
</script>

<style lang="less" scoped>
h5 {
  line-height: 50px;
  text-indent: 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #eeeeee;
  font-size: 16px;
}
.el-button--mini:first-child {
  background-color: #409eff;
  color: #fff;
}
.has-gutter th div {
  text-align: center;
}
.el-form {
  // display: flex;
  .el-form-item {
    display: flex;
  }
  .list-left {
    flex: 1;
  }
  .list-right {
    flex: 1;
  }
}
/deep/.el-form-item__content {
  display: flex;
}
</style>