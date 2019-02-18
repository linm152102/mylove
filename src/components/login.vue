<template>
  <div class="login_div">
    <el-form class="login_form" label-position="top" label-width="80px" :model="formdate">
      <h2>用户登录</h2>
      <el-form-item label="账号">
        <el-input v-model="formdate.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdate.password" type="password"></el-input>
      </el-form-item>
      <el-button @click="handlelogin()" class="login_btn" type="primary">登陆</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formdate: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // 发起登陆请求
    handlelogin () {
      this.$http.post(`login`, this.formdate)
        .then((res) => {
          const {data: {data, meta: {msg, status}}} = res
          if (status === 200) {
            const {token} = data
            localStorage.setItem('token', token)
            this.$router.push({
              name: 'home'
            })
          } else {
            this.$message.error(msg)
          }
        })
    }
  }
}
</script>

<style>
.login_div {
  height: 100%;
  background: #324152;
}
.login_form {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 500px;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 20px;
  background-color: #fff;
}
.login_btn {
  width: 100%;
}
</style>
