<template>
  <el-card class="box">
    <!-- 面包屑导航组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- alert组件 -->
    <el-alert title="注意:只允许为第三级分类设置参数" type="warning" show-icon class="alert_msg"></el-alert>
    <!-- 级联组件 -->
    <span>请选择商品分类</span>
    <el-cascader
      expand-trigger="hover"
      :options="options"
      :props="setProps"
      v-model="opctionCheck"
      @change="handleChange"
    ></el-cascader>
    <!-- tabs导航组件 -->
    <el-tabs v-model="active" class="tabs">
      <el-tab-pane label="动态参数" name="1">
        <!-- tabs中button 组件 -->
        <el-button type="primary" size="mini" disabled>设置动态参数</el-button>
        <!-- tabs中表格组件 -->
        <el-table :data="manyFrom" style="width: 100% " height="300px">
          <el-table-column type="expand" width="80">
            <template slot-scope="scope">
              <el-tag
                :key="tag"
                v-for="tag in scope.row.attr_vals"
                closable
                :disable-transitions="false"
                @close="handleClose(tag,scope.row)"
              >{{tag}}</el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="setInput(scope.row)"
                @blur="setInput(scope.row)"
              ></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
          </el-table-column>
          <el-table-column type="index" width="200"></el-table-column>
          <el-table-column property="attr_name" label="属性名称" width="300"></el-table-column>
          <el-table-column label="操作" width="200">
            <el-button type="primary" size="mini" plain icon="el-icon-edit" circle></el-button>
            <el-button type="danger" size="mini" plain icon="el-icon-delete" circle></el-button>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="2">
        <!-- 配置静态参数button组件 -->
        <el-button type="primary" size="mini" disabled>设置动态参数</el-button>
        <el-table :data="onlyFrom" style="width: 100%" height="300px">
          <el-table-column type="index" width="200"></el-table-column>
          <el-table-column property="attr_name" label="属性名称" width="300"></el-table-column>
          <el-table-column property="attr_vals" label="属性值" width="300"></el-table-column>
          <el-table-column label="操作" width="200">
            <el-button type="primary" size="mini" plain icon="el-icon-edit" circle></el-button>
            <el-button type="danger" size="mini" plain icon="el-icon-delete" circle></el-button>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      options: [],
      opctionCheck: [1, 3, 6],
      setProps: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      active: "1",
      manyFrom: [],
      onlyFrom: [],
      dynamicTags: [],
      inputVisible: false,
      inputValue: ""
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    async setInput(inputArr) {
      if (this.inputValue) {
        inputArr.attr_vals.push(this.inputValue);
        const res = await this.$http.put(
          `categories/${this.opctionCheck[2]}/attributes/${inputArr.attr_id}`,
          {
            attr_name: inputArr.attr_name,
            attr_sel: "many",
            attr_vals: inputArr.attr_vals.join(",")
          }
        );
        const {
          meta: { msg, status }
        } = res.data;
        if (status === 200) {
          this.$message.success(msg);
        }
        this.inputVisible = false;
        this.inputValue = "";
      }
    },
    async handleClose(tag, parentTag) {
      const arr = parentTag.attr_vals.indexOf(tag);
      parentTag.attr_vals.splice(arr, 1);
      const res = await this.$http.put(
        // 参数 attr_sel 类型必须为 only 或 many"  -> 接口文档更新了!->接口文档->不对X
        `categories/${this.opctionCheck[2]}/attributes/${parentTag.attr_id}`,
        {
          attr_name: parentTag.attr_name,
          attr_sel: "many",
          attr_vals: parentTag.attr_vals.join(",")
        }
      );
      const {
        meta: { status, msg }
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
      }
    },
    handleChange() {
      if (this.opctionCheck.length === 3) {
        this.getManyList();
      }
    },
    async getManyList() {
      const res1 = await this.$http.get(
        `categories/${this.opctionCheck[2]}/attributes?sel=only`
      );
      const data1 = res1.data.data;
      const status1 = res1.data.meta.status;
      if (status1 === 200) {
        this.onlyFrom = data1;
      }
      const res = await this.$http.get(
        `categories/${this.opctionCheck[2]}/attributes?sel=many`
      );
      const {
        data,
        meta: { status }
      } = res.data;
      if (status === 200) {
        data.forEach(item => {
          item.attr_vals = item.attr_vals.split(",");
        });
        this.manyFrom = data;
      }
    },
    async getGoodsList() {
      const res = await this.$http.get(`categories?type=3`);
      const {
        data,
        meta: { status }
      } = res.data;
      if (status === 200) {
        this.options = data;
      }
    }
  }
};
</script>
<style>
.box {
  height: 100%;
}
.alert_msg {
  margin: 10px 0 20px;
}
.tabs {
  margin-top: 10px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>


