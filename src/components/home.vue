<template>
  <el-container class="home_box">
    <el-header class="home_head">
      <el-col :span="4">
        <img src="@/assets/img/logo.png" alt="图片加载失败" class="home_head_img">
      </el-col>
      <el-col :span="19" class="home_head_h2">
        <h2>电商后台管理系统</h2>
      </el-col>
      <el-col :span="1" class="home_head_a">
        <a href="#" class="home_head_quit" @click.prevent="userquit()">退出</a>
      </el-col>
    </el-header>
    <el-container class="home_aside_main">
      <el-aside class="home_aside" width="200px">
        <el-menu 
        default-active="2" 
        class="el-menu-vertical-demo" 
        unique-opened 
        router>
          <el-submenu index="1" >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
              <el-menu-item index="users" >
                <i class="el-icon-menu"></i>用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
              <el-menu-item index="1-1"><i class="el-icon-menu"></i>角色列表</el-menu-item>
              <el-menu-item index="1-1"><i class="el-icon-menu"></i>权限列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
              <el-menu-item index="1-1"><i class="el-icon-menu"></i>商品列表</el-menu-item>
              <el-menu-item index="1-1"><i class="el-icon-menu"></i>分类参数</el-menu-item>
              <el-menu-item index="1-1"><i class="el-icon-menu"></i>商品分类</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
              <el-menu-item index="1-1"><i class="el-icon-menu"></i>订单列表</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
              <el-menu-item index="1-1"><i class="el-icon-menu"></i>数据报表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="home_main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  beforeMount () {
    if (!localStorage.getItem('token')) {
      this.$router.push({
        name: 'login'
      })
    }
  },
  methods: {
    userquit () {
      this.$router.push({
        name: 'login'
      })
      localStorage.clear()
      this.$message.warning('退出成功')
    }
  }
}
</script>

<style>
.home_box {
  height: 100%;
}
.home_head {
  padding: 0;
  height: 50px;
  line-height: 50px;
  background-color: #b3c0d1;
}
.home_aside {
  margin: 0;
  padding: 0;
  background-color: #ffffff;
  height: 100%;
}
.home_serch {
  margin: 0;
  padding: 0;
  /* width: 100%; */
}
.home_aside_main {
  height: 100%;
}
.home_head_img {
  margin-left: 0;
}
.home_main {
  height: 100%;
  background-color: #e9eef3;
}
.home_head_h2,
.home_head_a {
  text-align: center;
  color: #ffffff;
}
.home_head_quit {
  text-decoration: none;
}
</style>
