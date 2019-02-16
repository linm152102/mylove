<template>
  <!--  -->
  <el-card shadow="always">
    <!-- 面包屑导航组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索栏组件 -->
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
    <!-- 用户列表组件 -->
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
      <el-table-column label="创建日期" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            plain
            size="mini"
            @click.prevent="redactUser(scope.row)"
          ></el-button>
          <el-button
            @click.prevent="popupPower(scope.row)"
            type="success"
            icon="el-icon-check"
            circle
            plain
            size="mini"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            plain
            size="mini"
            @click="deleteUser(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
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
    <!-- 添加用户组件 -->
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
    <!-- 编辑用户组件 -->
    <el-dialog title="编辑用户" :visible.sync="redactUserfalse">
      <el-form :model="formdata">
        <el-form-item label="* 用户名" label-width="100px">
          <el-input v-model="formdata.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="formdata.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="formdata.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="redactUserfalse = false">取 消</el-button>
        <el-button type="primary" @click.prevent="redactUserOver()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除提示组件 methods 中的 deleteUser(user) 方法 -->
    <!-- 修改权限组件 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisible">
      <el-form :model="formdata">
        <el-form-item label="用户名" label-width="100px">{{formdata.username}}</el-form-item>
        <el-form-item label="角色" label-width="100px">
          <el-select v-model="permission" placeholder="请选择活动区域">
            <el-option label="请选择" :value="-1" disabled></el-option>
            <!-- <el-option 
            v-for="item in roleallot" 
            :label="item.roleName" 
            :value="item.id"></el-option> -->
          </el-select>
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
      formUserAdd: false, //添加用户
      redactUserfalse: false, //编辑用户
      dialogFormVisible: false,
      permission: -1,
      roleallot:[],
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
    popupPower(user) {
      this.formdata = user;
      this.dialogFormVisible = true;
      this.$http.get(`roles`).then((res)=>{
        const {data:{data,meta}} = res
        // console.log(data) 
        this.roleallot = data 
        console.log(this.roleallot)
        console.log(meta)
      })
    },
    deleteUser(user) {
      //删除单个用户
      this.$confirm("此操作将永久删除该永华, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // console.log(user.id)
          const res = await this.$http.delete(`users/${user.id}`);
          const {
            data: {
              meta: { msg, status }
            }
          } = res;
          if (status === 200) {
            this.pagenum = 1;
            this.getuserList();
            this.$message.success(msg);
          } else {
            this.$message.error(msg);
          }
        })
        .catch(() => {
          this.$message.info("删除取消");
        });
    },
    async redactUserOver() {
      //修改单个用户
      const res = await this.$http.put(`users/${this.formdata.id}`, {
        email: this.formdata.email,
        mobile: this.formdata.mobile
      });
      const {
        data: {
          meta: { msg, status }
        }
      } = res;
      if (status === 200) {
        this.$message.success(msg);
        this.redactUserfalse = false;
        this.getuserList();
      }
    },
    redactUser(user) {
      //弹出提示框 给formdata 赋值
      this.redactUserfalse = true;
      this.formdata = user;
    },
    showAddUser() {
      //点击添加用户 改变添加用户表单绑定的布尔值属性
      this.formUserAdd = true;
    },
    userAdd() {
      //添加新用户
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
        } else {
          this.$message.error("邮箱输入错误");
        }
      } else {
        this.$message.error("账号输入错误");
      }
    },
    getAllUser() {
      //清空搜索框 重新加载列表
      this.pagenum = 1;
      this.getuserList();
    },
    serchUser() {
      //点击搜索 获取符合条件的用户列表信息
      this.pagenum = 1;
      this.getuserList();
    },
    handleSizeChange(val) {
      //当每页显示个数发生变化的时候改变页数 防止出错
      this.pagenum = 1;
      this.pagesize = val;
      this.getuserList();
    },
    handleCurrentChange(val) {
      // 当页数发生变化的时候 改变初始页数 防止出错
      this.pagenum = 2;
      this.pagenum = val;
      this.getuserList();
    },
    async getuserList() {
      //发送请求 获取用户列表
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
