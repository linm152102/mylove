<template>
  <el-card shadow="always">
    <!-- 面包屑导航组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加用户按钮 -->
    <el-button class="add_user">添加用户</el-button>
    <!-- 角色列表组件 -->
    <el-table ref="singleTable" :data="list" style="width: 100%">
      <!-- 展开栏组件 -->
      <el-table-column width="50" type="expand">
        <template slot-scope="scope">
          <el-row v-for="(item ) in scope.row.children" :key="item.id">
            <el-col :span="4" class="autn_name">
              <el-tag closable @close="handleClose(scope.row, item.id)">{{item.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item1 ) in item.children" :key="item1.id">
                <el-col :span="4">
                  <el-tag
                    type="success"
                    @close="handleClose(scope.row, item1.id)"
                    closable
                    class="autn_name1"
                  >{{ item1.authName }}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20" class="autn_name2">
                  <el-tag
                    @close="handleClose(scope.row, item2.id)"
                    v-for="(item2 ) in item1.children"
                    :key="item2.id"
                    closable
                  >{{item2.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column property="roleDesc" label="角色描述" width="220"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle plain size="mini"></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            plain
            size="mini"
            @click.prevent="upfoldList(scope.row)"
          ></el-button>
          <el-button type="danger" icon="el-icon-delete" circle plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出节点树对话框组件 -->
    <el-dialog title="分配权限" :visible.sync="dialogVisible" width="50%">
      <!-- 节点树 组件 -->
      <el-tree
        ref="treeList"
        :data="treeList"
        show-checkbox
        node-key="id"
        :default-checked-keys="checkList"
        :props="defaultProps"
        default-expand-all
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.prevent=" handleSetRoles()">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      list: [],
      checkList: [],
      treeList: [],
      rolesId: -1,
      dialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  created () {
    this.getuserList()
    this.allotPower()
  },
  methods: {
    async handleClose (roles, rolesId) {
      const res = await this.$http.delete(`roles/${roles.id}/rights/${rolesId}`)
      const {data, meta: {msg, status}} = res.data
      if (status === 200) {
        roles.children = data
        this.$message.success(msg)
      } else {
        this.$message.error(msg)
      }
    },
    async handleSetRoles () {
      // 点击确定 发送请求修改当前用户的权限
      //   const arr2 = this.$refs.treeList.getHalfCheckedNodes();
      // 获取半选的节点 以对象的形式展示
      const arr1 = this.$refs.treeList.getHalfCheckedKeys()
      //   获取所有半选的节点 id arr1
      const arr3 = this.$refs.treeList.getCheckedKeys()
      //   获取所有全选的id
      const arr = [...arr1, ...arr3]
      const res = await this.$http.post(`roles/${this.rolesId}/rights`, {
        rids: arr.join(',')
      })
      console.log(res)
      const {
        meta: { msg, status }
      } = res.data
      if (status === 200) {
        this.$message.success(msg)
      } else {
        this.$message.error(msg)
      }
      this.dialogVisible = false
    },
    upfoldList (tree) {
      this.checkList = []
      // consoel.log(checkList)
      console.log(tree)
      // 点击按钮 获取树状权限列表
      // this.allotPower()
      this.dialogVisible = true
      this.rolesId = tree.id
      const arr = []
      tree.children.forEach(item => {
        item.children.forEach(item1 => {
          item1.children.forEach(item2 => {
            arr.push(item2.id)
          })
        })
      })
      this.checkList = arr
      console.log(this.checkList.length)
      this.getuserList()
    },
    async allotPower () {
      // 获取节点树信息
      const res = await this.$http.get(`rights/tree`)
      const {
        data,
        meta: { status }
      } = res.data
      if (status === 200) {
        this.treeList = data
      }
    },
    async getuserList () {
      // 获取用户权限信息
      const res = await this.$http.get(`roles`)
      const {
        data,
        meta: { status }
      } = res.data
      if (status === 200) {
        this.list = data
      }
    }
  }
}
</script>
<style>
.add_user {
  margin-top: 20px;
}
.autn_name {
  margin-bottom: 10px;
}
/* .autn_name1:last-child{
    margin-left: 40px;
} */
/* .autn_name2{
    margin-left: 40px;
} */
</style>
