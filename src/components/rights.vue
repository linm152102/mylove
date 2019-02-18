<template>
  <el-card shadow="always">
    <!-- 面包屑导航栏组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 商品权限列表组件 -->
    <el-table :data="list" border style="width: 100%  " height="400px" class="goodslist">
       <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column prop="authName" label="权限名称" width="220">
    </el-table-column>
    <el-table-column prop="path" label="路径" width="220">
    </el-table-column>
    <el-table-column label="层级">
      <template slot-scope="scope">
       <span v-if="scope.row.level === '0'">一级</span>
       <span v-if="scope.row.level === '1'">二级</span>
       <span v-if="scope.row.level === '2'">三级</span>
      </template>
    </el-table-column>
  </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getPowerList()
  },
  methods: {
    getPowerList () {
      this.$http.get(`rights/list`).then(res => {
        const { data: {data, meta: {status}} } = res
        if (status === 200) {
          this.list = data
        }
      })
    }
  }
}
</script>

<style>
.goodslist{
  margin-top: 20px;
}
</style>
