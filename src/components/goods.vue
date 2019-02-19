<template>
  <el-card shadow="always">
    <!-- 面包屑导航组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框组件 -->
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容"  class="serchInput">
        <el-button type="primary" plain>添加商品</el-button>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
       <el-button type="success" plain>添加商品</el-button>
    </div>
    <!-- table表格组件 -->
    <el-table  :data="list"  style="width: 100%">
    <el-table-column type="index" width="50" index="50">
    </el-table-column>
    <el-table-column property="date" label="商品名称" width="450">
    </el-table-column>
    <el-table-column property="name" label="商品价格(元)" width="140">
    </el-table-column>
    <el-table-column property="address" label="商品重量" width="140">
    </el-table-column>
    <el-table-column property="address" label="创建日期" width="140">
    </el-table-column>
    <el-table-column property="address" label="操作" width="140">
    </el-table-column>
  </el-table>
  </el-card>
</template>
<script>
export default {
    data (){
        return{
            list:[],
            query:''
        }
    },
    created(){
        this.getcategoriesList()
    },
    methods:{
        async getcategoriesList(){
           const res = await this.$http.getcategoriesList(`categories`)
        }
    }
}
</script>
<style>
.serchInput{
  width: 300px;
}
</style>

