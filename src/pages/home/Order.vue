<template>
  <div id="order">
    <el-form :model="formInline">
      <el-col :span="6">
        <el-form-item label="订单号">
          <el-input placeholder="订单号" v-model="formInline.orderNo"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="收货人">
          <el-input placeholder="收货人" v-model="formInline.consignee"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="手机号">
          <el-input placeholder="手机号" v-model="formInline.phone"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="订单状态" label-width="80px">
          <el-select v-model="formInline.orderState" placeholder="订单状态">
            <el-option v-for="item in labellist" :key="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-form>
    <div class="block">
      <span>选择时间 &emsp;</span>
      <el-date-picker
        v-model="formInline.date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>&emsp;
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100% ;margin-top:20px">
      <el-table-column prop="orderNo" label="订单号"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="120"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="consignee" label="收货人"></el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址" width="180"></el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间"></el-table-column>
      <el-table-column prop="remarks" label="用户备注"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额"></el-table-column>
      <el-table-column prop="orderState" label="订单状态"></el-table-column>
      <el-table-column prop="other" label="操作">
        <template slot-scope="scope">
          <span @click="checkinfo(scope)" style="color:#409eff">查看</span>&emsp;
          <span @click="editinfo(scope)" style="color:#409eff">编辑</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pagesize"
      layout="total,prev, pager, next, jumper "
      :total="total"
    ></el-pagination>

    <el-dialog title="详细信息" :visible.sync="dialogVisible">
      <el-form :model="cycndata" style="display:block">
        <el-form-item
          :label="title[keys] "
          v-for="(item,keys) in cycndata"
          :key="keys"
          label-width="80px"
        >
          <!-- 查看 -->
          <span v-show="status">{{item}}</span>
          <!-- 编辑 -->

          <el-input
            v-show="!status"
            style="width:220px"
            v-model="cycndata[keys]"
            v-if="(keys=='orderNo' ||keys=='phone'||keys=='consignee'||keys=='deliverAddress'||keys=='orderAmount'||keys=='remarks')"
          ></el-input>
          <el-date-picker
            v-show="!status"
            type="datetime"
            v-if="(keys=='orderTime'||keys=='deliveryTime')"
            v-model="cycndata[keys]"
          ></el-date-picker>
          <el-select v-show="!status" v-model="cycndata[keys]" v-if="keys=='orderState'">
            <el-option v-for="item in labellist" :key="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-show="!status" type="primary" @click="editsend">确 定</el-button>
        <!-- <el-button v-show="status" type="primary" @click="dialogVisible = false">确 定</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getorderinfo, editorder } from "@/api/apis";
import { changetime } from "@/utils/utils";
export default {
  data() {
    return {
      labellist: ["派送中", "已受理", "已完成","全部"],
      currentPage: 1,
      pagesize: 5,
      total: 0,
      formInline: {},
      //表格信息渲染
      tableData: [],
      cycndata: {},

      //弹窗
      dialogVisible: false,

      //切换状态
      status: true,
      //标题
      title: {
        orderNo: "订单号",
        orderTime: "下单时间",
        phone: "联系电话",
        consignee: "收货人",
        deliverAddress: "送货地址",
        deliveryTime: "送达时间",
        remarks: "备注",
        orderAmount: "订单金额",
        orderState: "订单状态",
      },
      //  title:["订单号","下单时间","联系电话","收货人","送货地址","送达时间","备注","订单金额","订单状态"]
    };
  },
  methods: {
    //查看信息
    checkinfo(scope) {
      (this.status = true), (this.dialogVisible = true);
      delete this.tableData[scope.$index].id;
      this.cycndata = scope.row;
    },
    //编辑信息
    editinfo(scope) {
      (this.status = false), (this.dialogVisible = true);
      this.cycndata = { ...scope.row };
    },
    //发送信息
    editsend() {
      editorder(this.cycndata).then((res) => {
        if (res.data.code == 0) {
          this.$message("超美味点餐系统提示:" + res.data.msg);
          this.dialogVisible = false;
          this.draw();
        }
      });
    },
    //模糊查询
    onSubmit() {
      this.newform={}
    
      if(this.formInline.orderNo!="")this.newform.orderNo=this.formInline.orderNo
      if(this.formInline.consignee!="")this.newform.consignee=this.formInline.consignee
      if(this.formInline.phone!="")this.newform.phone=this.formInline.phone
      if(this.formInline.orderState!=""&&this.formInline.orderState!="全部")this.newform.orderState=this.formInline.orderState
      if(this.formInline.date!=null)this.newform.date = JSON.stringify([changetime(this.formInline.date[0]),changetime(this.formInline.date[1])])
      
      // console.log(this.newform)

      this.draw(this.newform)
    },
    //分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.draw(this.newform);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.draw(this.newform);
    },
    //渲染
    draw(param) {
      getorderinfo({
        currentPage: this.currentPage,
        pageSize: this.pagesize,
        ...param
      }).then((res) => {
        // console.log(res.data);
        for (var key of res.data.data) {
          // console.log(key.ctime)
          key.deliveryTime = changetime(key.deliveryTime);
          key.orderTime = changetime(key.orderTime);
        }
        this.total = res.data.total;
        this.tableData = res.data.data;
        // console.log(this.tableData);
      });
    },
  },

  created() {
    this.draw();
  },
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  background-color: #fff;
  line-height: 40px;
  text-indent: 10px;
}
.user {
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
  span {
    line-height: 40px;
    margin-right: 20px;
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}

#order {
  .el-form {
    display: flex;
    font-size: 10px;
  }
}
// .el-input__inner{
//  width:300px
// }
.el-form-item {
  display: flex;
}
/deep/.el-form-item__content {
  margin-left: 0px !important;
}
</style>