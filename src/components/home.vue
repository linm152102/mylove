<template>
  <el-container>
    <el-header class="home_head">
      <el-col :span="4">
      <img src="@/assets/img/logo.png" alt="图片加载失败">
      </el-col>
      <el-col :span="19" class="home_head_h2">
       <h2>电商管理系统</h2>
      </el-col>
      <el-col :span="1" class="home_head_a">
      <a href="#" class="home_head_quit">退出</a>
      </el-col>
    </el-header>
    <el-container>
      <el-aside width="200px" class="home_aside">Aside</el-aside>
      <el-main class="home_main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style>
.home_head {
    /* height: ; */
    height: 50px;
    line-height: 50px;
  background-color: yellow;
}
.home_aside {
  background-color: blue;
}
.home_main {
  background-color: red;
}
.home_head_h2,
.home_head_a
{
    text-align: center;
}
.home_head_quit{
    text-decoration: none;
}
</style>
