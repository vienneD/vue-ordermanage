<template>
  <div style="background-color:#fff">
    <div class="title">
      <h5>商品分类</h5>
      <el-button type="primary" @click="dialogFormVisible = true">添加分类</el-button>
    </div>

    <el-table :data="tableData" style="width: 100% ;padding:0px 10px 0px 10px">
      <el-table-column label="序号" type="index" width="100"></el-table-column>
      <el-table-column label="分类名称" width="200">
        <template slot-scope="scope">
          <span v-show="scope.row.status">{{ scope.row.cateName }}</span>
          <el-input v-show="!(scope.row.status)" type="text" v-model="scope.row.cateName" clearable></el-input>
        </template>
      </el-table-column>
      <el-table-column label="是否启用" width="180">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.state" :disabled="scope.row.status"  active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">{{scope.row.status?"编辑":"完成"}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :page-size="currentPage2"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 点击分类弹窗 -->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" :label-width="formLabelWidth">
          <el-switch v-model="form.value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureaddclass">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addgclass,classgoods,removeclass ,amendclass} from "@/api/apis";


export default {
  data() {
    return {
      total: 5,
      currentPage1: 1,
      currentPage2: 5,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",

        value: true,
      },
      formLabelWidth: "100px",
      tableData: [
        {
          cateName: "热销榜",
          state: true,
        },
      ],
    };
  },
  created() {
    this.round();
  },
  methods: {
    //添加分类
    sureaddclass() {
      this.dialogFormVisible = false;
      // console.log( 1+this.form.name,this.form.value)
      if (this.form.name && this.form.value) {
        //  console.log(1)
        addgclass(this.form.name, this.form.value).then((res) => {
          if (res.data.code == "0") {
            this.$message(res.data.msg);
          }
        });
        this.round();
      } else {
        this.$message("超美味系统提示:添加失败,需要输入分类或者开启启用哦~");
      }
      this.form.name = "";
      this.form.value = true;
    },
    //分页器
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.currentPage2 = val;
      this.round();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage1 = val;
      this.round();
    },
    //编辑
    handleEdit(scope) {
      
    if(scope.status){
       scope.status=false
    }else{
      console.log(scope.cateName,scope.state)
      //发送请求
      amendclass(scope.id,scope.cateName,scope.state).then(res=>{
        if(res.data.code==0){
          this.$message(res.data.msg);
        }
      })
       scope.status=true

    }
    },
    //渲染
    round() {
      classgoods(this.currentPage1, this.currentPage2).then((res) => {
        // console.log(res.data.data)
        for (var key of res.data.data) {
          key.status = true; //切换状态
         key.state=Boolean(key.state)
        }
         this.total = res.data.total;
        this.tableData = res.data.data;
        
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
         removeclass(obj.id).then((res) => {
        if (res.data.code == "0") {
          this.round()
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
</style>