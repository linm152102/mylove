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
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
       <el-button type="success" plain @click="goodsAdd()">添加商品</el-button>
    </div>

    <!-- table表格组件 -->
    <el-table  :data="list"  style="width: 100%">
    <el-table-column type="index" width="50">
    </el-table-column>
    <el-table-column property="goods_name" label="商品名称" width="450">
    </el-table-column>
    <el-table-column property="goods_price" label="商品价格(元)" width="140">
    </el-table-column>
    <el-table-column property="goods_weight" label="商品重量" width="140">
    </el-table-column>
    <el-table-column  label="创建日期" width="140">
      <template slot-scope="scope">
        {{scope.row.upd_time | fmtDate}}
      </template>
    </el-table-column>
    <el-table-column  label="操作" width="140">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" circle @click="userUpload(scope.row)"  plain size="mini"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click="userDelete(scope.row)" plain size="mini"></el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-card>
</template>
<script>
export default {
    data (){
        return{
            list:[],
            query:'',
            pagenum:'1',
            pagesize:'10'
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
      goodsAdd(){
        this.$router.push({name:'goodsadd'})
      },
      userUpload(){
        //用户编辑方法
      },
      userDelete(){
        //用户删除方法
      },
        async getGoodsList(){
           const {data:{data:{goods},meta:{status}}} = await this.$http.get(`goods?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
           if(status===200){
             this.list = goods
           }
           
        }
    }
}
</script>
<style>
.serchInput{
  width: 300px;
}
</style>

