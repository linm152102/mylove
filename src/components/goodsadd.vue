<template>
  <el-card shadow="always" class="card">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-alert title="添加商品信息" type="info" center show-icon class="alert_message"></el-alert>
    <!-- 步骤条 -->
    <el-steps finish-status="success" align-center :active="active*1">
      <el-step title="基本信息" @click="getGoodList()"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- from组件 -->
    <el-form label-width="80px" :model="from" label-position="top" class="card_from">
      <el-tabs tab-position="left" v-model="active" @tab-click="getSpecList()">
        <!-- 基本信息配置 -->
        <el-tab-pane label="基本信息" name="1">
          <el-form-item label="商品名称">
            <el-input class="input_good"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input class="input_good"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input class="input_good"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input class="input_good"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              size="medium"
              expand-trigger="hover"
              :options="options"
              :props="optionsList"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="2">
          <el-form-item :label="item.attr_name" v-for="item in checkedList" :key="item.attr_id">
            <el-checkbox-group v-model="item.attr_vals">
              <el-checkbox
                border
                type="success"
                :label="item1"
                v-for="item1 in item.attr_vals"
                :key="item1"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="3">
          <el-form-item :label="item.attr_name" v-for="item in inputList" :key="item.attr_id">
            <el-input class="input_good" :value="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="4">商品图片</el-tab-pane>
        <el-tab-pane label="商品内容" name="5">商品内容</el-tab-pane>
      </el-tabs>
    </el-form>
    <!-- tabs 组件 -->
  </el-card>
</template>
<script>
export default {
  // v-model="selectedOptions2"
  // goods_name	商品名称	不能为空
  // goods_price	价格	不能为空
  // goods_number	数量	不能为空
  // goods_weight	重量	不能为空
  // goods_introduce	介绍	可以为空
  // pics	上传的图片临时路径（对象）	可以为空
  // attrs	商品的参数（数组）
  // goods_cat	以为','分割的分类列表	不能为空
  data() {
    return {
      active: "1", //步骤组件默认选中的第一个 提供数据和tabs 互通
      from: {
        //提交商品的数据
        goods_name: "",
        goods_cat: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        pics: "",
        attrs: ""
      },
      options: [],
      optionsList: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      checkedList: [],
      inputList:[]
    };
  },
  created() {
    this.getGoodList();
    // this.getSpecList()
  },
  methods: {
    getSpecList() {
      console.log(1433223);
      const str = [1, 3, 6];
      const str1 = "many";
      this.$http.get(`categories/6/attributes?sel=only`).then(resData => {
        console.log(resData.data.data);
        this.inputList = resData.data.data
      });

      this.$http.get(`categories/6/attributes?sel=${str1}`).then(res => {
        const {
          data,
          meta: { status }
        } = res.data;
        if (status === 200) {
          data.forEach(item => {
            item.attr_vals = item.attr_vals.split(",");
          });
          this.checkedList = data;
        }
      });
    },
    handleChange() {},
    async getGoodList() {
      const {
        data: {
          data,
          meta: { status }
        }
      } = await this.$http.get(`categories?type=3`);
      this.options = data;
    }
  }
};
</script>
<style>
.alert_message {
  margin: 10px 0;
}
.card {
  height: 1000px;
}
.card_from {
  height: 800px;
  overflow: auto;
}
/* .input_good{
    width: 800px;
} */
</style>


