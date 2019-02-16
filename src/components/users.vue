<template>
  <!--  -->
  <el-card shadow="always">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
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
      <el-button type="success" plain @click.prevent="userAdd()">添加用户</el-button>
    </div>
    <!-- 用户列表表单 -->
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
    <!-- 分页 ui 组件 -->
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
    <!-- 添加用户表单 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
      dialogFormVisible: false,
      formdata: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      }
    };
  },
  created() {
    this.getuserList();
  },
  methods: {
    userAdd() {
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    getAllUser() {
      this.pagenum = 1;
      this.getuserList();
    },
    serchUser() {
      this.pagenum = 1;
      this.getuserList();
    },
    handleSizeChange(val) {
      // 给每页显示的个数 添加数据
      this.pagenum = 1;
      this.pagesize = val;
      this.getuserList();
    },
    handleCurrentChange(val) {
      this.pagenum = 2;
      // 给显示第几页添加数据
      this.pagenum = val;
      this.getuserList();
    },
    async getuserList() {
      this.$http.defaults.headers.common[
        "Authorization"
      ] = localStorage.getItem("token");
      // this.$http.defaults.headers.common[
      //   'Authorization'
      // ] = localStorage.getItem('token')
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      const {
        data: {
          data,
          meta: { status }
        }
      } = res;
      if (status === 200) {
        const { users } = data;
        this.total = data.total;
        this.list = users;
        // this.$message.success(msg)
      }
    }
  }
};
</script>
<style>
.serch {
  width: 400px;
}
.add_user {
  height: 300px;
}
</style>
