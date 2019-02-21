<template>
  <el-card class="box">
    <!-- 面包屑导航组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加按钮 el-button -->
    <el-button type="success" plain class="add_btn">添加分类</el-button>
    <!-- el-table 表格 安装插件可以展开每一项-->
    <el-table :data="fromList" style="width: 100%" height="380px">
      <el-tree-grid
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
        childKey="children"
        label="分类名称"
        width="200"
        prop="cat_name"
      ></el-tree-grid>
      <el-table-column prop="date" label="级别" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level===0">一级</span>
          <span v-if="scope.row.cat_level===1">二级</span>
          <span v-if="scope.row.cat_level===2">三级</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="是否有效" width="300">
        <template slot-scope="scope">
          <span v-if="scope.rowcat_deleted">无效</span>
          <span v-else>有效</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <el-button type="primary" plain size="mini" icon="el-icon-edit" circle></el-button>
        <el-button type="danger" plain size="mini" icon="el-icon-delete" circle></el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
import ElTreeGrid from "element-tree-grid";
export default {
  components: {
    ElTreeGrid
  },
  created() {
    this.getFromList();
  },
  data() {
    return {
      fromList: []
    };
  },
  methods: {
    async getFromList() {
      const res = await this.$http.get(`categories?type=3`);
      const {
        data: {
          data,
          meta: { status }
        }
      } = res;
      if (status === 200) {
        this.fromList = data;
        console.log(this.fromList);
      }
    }
  }
};
</script>
<style>
.box {
  height: 100%;
}
.add_btn {
  margin: 10px 0 15px;
}
</style>
