<template>
  <!--  -->
  <el-card shadow="always">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 15px;">
      <el-input
        v-model="query"
        @clear="getAllUser()"
        clearable
        placeholder="请输入内容"
        class="input-with-select serch"
      >
        <el-button slot="append" icon="el-icon-search" @click.prevent="serchUser()"></el-button>
      </el-input>
      <el-button type="success" plain @click.prevent="showAddUser()">添加用户</el-button>
    </div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="#" width="80"></el-table-column>
      <el-table-column prop="username" label="姓名" width="140"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column prop="create_time" label="创建日期" width="180"></el-table-column>
      <el-table-column label="用户状态" width="130">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[2, 3, 6, 8]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog title="添加用户" :visible.sync="formUserAdd">
      <el-form :model="formdata">
        <el-form-item label="* 用户名" label-width="100px">
          <el-input v-model="formdata.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="* 密码" label-width="100px">
          <el-input v-model="formdata.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="formdata.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" label-width="100px">
          <el-input v-model="formdata.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <!--  -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formUserAdd = false">取 消</el-button>
        <el-button type="primary" @click.prevent="userAdd()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 2,
      list: [],
      total: -1,
      dialogTableVisible: false,
      formUserAdd: false,
      formdata: {
        username: "",
        password: "",
        email: "",
        mobile: ""
        // username	用户名称	不能为空
        // password	用户密码	不能为空
        // email	邮箱	可以为空
        // mobile 手机号
      }
    };
  },
  created() {
    this.getuserList();
  },
  methods: {
    showAddUser() {//点击添加用户 改变添加用户表单绑定的布尔值属性
      this.formUserAdd = true;
    },
    userAdd() {//添加新用户
      const uname = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/;
      const uemail = /^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/;
      if (uname.test(this.formdata.username)) {
        if (uemail.test(this.formdata.email)) {
          this.$http.post(`users`, this.formdata).then(res => {
            const {
              data: {
                meta: { msg, status }
              }
            } = res;
            if (status === 201) {
              this.formUserAdd = !this.formUserAdd;
              this.$message.success(msg);
              this.getuserList();
              this.formdata = {};
            } else {
              this.$message.error(msg);
            }
          });
        }else{
          this.$message.error("邮箱输入错误")
        }
      }else{
        this.$message.error("账号输入错误")
      }
    },
    getAllUser() {//清空搜索框 重新加载列表
      this.pagenum = 1;
      this.getuserList();
    },
    serchUser() {//点击搜索 获取符合条件的用户列表信息
      this.pagenum = 1;
      this.getuserList();
    },
    handleSizeChange(val) {//当每页显示个数发生变化的时候改变页数 防止出错
      this.pagenum = 1;
      this.pagesize = val;
      this.getuserList();
    },
    handleCurrentChange(val) {// 当页数发生变化的时候 改变初始页数 防止出错
      this.pagenum = 2;
      this.pagenum = val;
      this.getuserList();
    },
    async getuserList() {//发送请求 获取用户列表
      this.$http.defaults.headers.common[
        "Authorization"
      ] = localStorage.getItem("token");
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = res;
      const { users } = data;
      this.total = data.total;
      this.list = users;
    }
  }
};
</script>
<style>
.serch {
  width: 400px;
}
</style>
