<template>
  <div class="uselist">
    <el-table
    v-loading="loading"
    element-loading-text="拼命加载中"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      :style="style"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="账号" width="120">
        <template slot-scope="scope">{{ scope.row.account }}</template>
      </el-table-column>
      <el-table-column prop="userGroup" label="用户组" width="120"></el-table-column>
      <el-table-column prop="ctime" label="创建时间"></el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="amendmsg(scope)">编辑</el-button>
          
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5,10, 15]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <div style="margin-top: 20px">
      <el-button @click="alldel" style="background-color:#F56C6C ;color:#fff">批量删除</el-button>
      <el-button @click="toggleSelection()" style="background-color:#409EFF ;color:#fff">取消选择</el-button>
    </div>

    <!-- 弹框 -->

    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <!-- <template slot-scope="scope"> -->
      <el-form :model="form" label-width="auto">
        
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.account" autocomplete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="用户组" :label-width="formLabelWidth">
          <el-select v-model="form.userGroup" placeholder="请选择分组" style="width:300px">
            <el-option
              v-for="(item,index) in grouplist"
              :key="index"
              :label="item.label"
              :value="item.group"
            ></el-option>
            
          </el-select>
        </el-form-item>
        
      </el-form>

      <div slot="footer" class="dialog-footer" style="display:flex;justify-content:flex-end">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </div>
      <!-- </template> -->
    </el-dialog>
  </div>
</template>

<script>
import { userlist, deluser, batchdeluser, amenduser } from "@/api/apis";

//引入公共函数
import { changetime } from "@/utils/utils";
export default {
  data() {
    return {
      //样式
      style:{},
      tableData: [
        {
          ctime: "",
          account: "",
          userGroup: "",
          imgUrl: "",
        },
      ],

      multipleSelection: [],
      currentPage: 1,
      pagesize: 5,
      total: 0,
      ids: [],
      ind: 0,
      //加载
      loading:true,
      //弹框数据
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        account: "",
        userGroup: "",
      },
      formLabelWidth: "120px",
      grouplist: [
        {
          label: "超级管理员",
          group: "超级管理员",
        },
        {
          label: "普通管理员",
          group: "普通管理员",
        },
      ],
    };
  },
  created() {
    this.style="height:310px";
    this.draw();
  },
  methods: {
    // 取消选择
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    //选中的当前行
    handleSelectionChange(arr) {
      // this.multipleSelection = val;

      this.ids = arr.map((item) => {
        // console.log(item.id)
        return item.id;
      });
    },

    //批量删除
    alldel() {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "超美味点餐系统提示", {
        confirmButtonText: "确定删除",
        cancelButtonText: "再考虑考虑",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          batchdeluser(JSON.stringify(this.ids)).then((res) => {
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
    //渲染
    draw() {
      this.loading=true,
      // setTimeout(() => {
        userlist(this.currentPage, this.pagesize).then((res) => {
        //  console.log(res.data.data)
          
        for (var key of res.data.data) {
          key.ctime = changetime(key.ctime);
        }

        this.total = res.data.total;
        this.tableData = res.data.data;
        this.loading=false
      });
      // }, 1000);
      
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.draw();
      this.style={}
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.draw();
      this.style={}
    },

    //编辑
    amendmsg(scope) {
      this.dialogFormVisible = true;
      this.ind = scope.$index;
      this.form={...scope.row}
      
    },
    //确定修改
    handleEdit() {
      amenduser(
        this.tableData[this.ind].id,
        this.form.account,
        this.form.userGroup
      ).then((res) => {
        // console.log(res)
        if (res.data.code == "0") {
          this.$message({
            message: res.data.msg,
            type: "Success",
          });
          this.dialogFormVisible = false;
        }
      });
    },
    //单个删除
    handleDelete(index, obj) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "超美味点餐系统提示", {
        confirmButtonText: "确定删除",
        cancelButtonText: "再考虑考虑",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          deluser(obj.id).then((res) => {
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
};
</script>

<style lang="less" scoped>
.uselist {
  background-color: #fff;
  padding: 20px;
}
</style>