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
    <el-form label-width="80px" v-model="from" label-position="top" class="card_from">
      <el-tabs tab-position="left" v-model="active" @tab-click="geterror()">
        <!-- 基本信息配置 -->
        <el-tab-pane label="基本信息" name="1">
          <el-form-item label="商品名称">
            <el-input class="input_good" v-model="from.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input class="input_good" v-model="from.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input class="input_good" v-model="from.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input class="input_good" v-model="from.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              size="medium"
              v-model="goodsCheckList"
              expand-trigger="hover"
              @change="getshop()"
              :options="options"
              :props="optionsList"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="2">
          <el-form-item :label="item.attr_name" v-for="item in checkedList" :key="item.attr_id">
            <el-checkbox-group v-model="item.attr_vals">
              <el-checkbox border :label="item1" v-for="item1 in item.attr_vals" :key="item1"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="3">
          <el-form-item :label="item3.attr_name" v-for="item3 in inputList" :key="item3.attr_id">
            <el-input class="input_good" :value="item3.attr_vals" v-model="item3.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="4">
          <el-form-item label="商品图片">
            <!-- <el-input class="input_good" ></el-input> -->
            <el-upload
              multiple
              :limit="6"
              class="upload-demo"
              action="http://localhost:8888/api/private/v1/upload "
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :headers="headersToken"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="5">
          <el-form-item label="商品图片">
            <el-button type="primary" plain @click="goodsAdd()">添加商品</el-button>
            <quill-editor class="quill" v-model="from.goods_introduce"></quill-editor>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <!-- tabs 组件 -->
  </el-card>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor
  },
  data () {
    return {
      active: '1', // 步骤组件默认选中的第一个 提供数据和tabs 互通
      from: {
        // 提交商品的数据
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      options: [], // 级联组件中的数据
      optionsList: {
        // 配置级联中属性 使得级联中属性和后台获取的数据匹配
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      checkedList: [], // 商品属性数据列表 默认每个都选中 动态
      inputList: [], // 商品属性数据列表 静态
      goodsCheckList: [], // 级联组件中选中的分类的每一项id
      headersToken: {
        Authorization: localStorage.getItem('token')
      }
    }
  },
  created () {
    this.getGoodList()
  },
  methods: {
    getshop () {
      this.getSpecList()
    },
    async goodsAdd () {
      // console.log(1433223)
      this.from.goods_cat = this.goodsCheckList.join(',')
      const dy = this.checkedList
      const arr1 = dy.map((item) => {
        return {attr_id: item.attr_id, attr_value: item.attr_vals}
      })
      arr1.forEach((item) => {
        item.attr_value = item.attr_value.join(',')
      })
      const arr2 = this.inputList.map((item) => {
        return {attr_id: item.attr_id, attr_value: item.attr_vals}
      })
      const arr = [...arr1, ...arr2]
      this.from.attrs = arr
      const res = await this.$http.post(`goods`, this.from)
      const {meta: {msg, status}} = res.data
      if (status === 201) {
        this.$message.success(msg)
        this.$router.push({name: 'goods'})
      }

      // 这个是要问 拉拉或者讲师的  为啥这个会报错
    //   const arr = this.checkedList
    //   const arr1 = arr.map((item)=>{
    //     return{attr_id: item.attr_id, attr_value: item.attr_vals.join(',')}
    //   })
    //   console.log(arr1)
    //   this.checkedList.forEach((item)=>{
    //     item.attr_vals = item.attr_vals.join(',')
    //   })
    // console.log(this.inputList)
    // console.log(this.checkedList)
      // const arr = [...this.checkedList,...this.inputList]
      // console.log(arr)
    },
    handleRemove (file, fileList) {
      const arr = this.from.pics.findIndex(item => {
        return item.pics === file.response.data.tmp_path
      })
      this.from.pics.splice(arr, 1)
    },
    handleSuccess (response, file, fileList) {
      const {
        data,
        meta: { msg, status }
      } = response
      if (status === 200) {
        this.from.pics.push({
          pic: data.tmp_path
        })
      } else {
        this.$message.error(msg)
      }
    },
    getSpecList () {
      if (this.goodsCheckList.length !== 3) {
        this.$message.error('请选择第三级分类')
        this.active = '1'
        return
        // 只需要判断是否选择第三类类型 不需要判断是否选择第几项 一块加载
      }
      this.$http
        .get(`categories/${this.goodsCheckList[2]}/attributes?sel=many`)
        .then(res => {
          const {
            data,
            meta: { status }
          } = res.data
          if (status === 200) {
            data.forEach(item => {
              item.attr_vals = item.attr_vals.split(',')
            })
            this.checkedList = data
          }
        })
      this.$http
        .get(`categories/${this.goodsCheckList[2]}/attributes?sel=only`)
        .then(resData => {
          const {
            meta: { status }
          } = resData.data
          if (status === 200) this.inputList = resData.data.data
        })
    },
    geterror () {
      if (this.goodsCheckList.length !== 3) {
        this.$message.error('请选择第三级分类')
      }
    },
    async getGoodList () {
      // 获取商品类型 当获取成功的时候给级联组件赋值 当这个组件没有显示完成时加载 在created 中使用
      const res = await this.$http.get(`categories?type=3`)
      const {
        data: {
          data,
          meta: { status }
        }
      } = res
      if (status === 200) {
        this.options = data
      }
    }
  }
}
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
.input_good {
  width: 800px;
}
.ql-container {
  min-height: 200px;
}
</style>
