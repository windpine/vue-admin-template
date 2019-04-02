<template>
  <div>
    <el-row>
      <el-col :span="24">
        <label style="line-height: 300px">存放首页图片！！！！</label>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="background-color: #f4f4f4">
      <el-col :span="3"><div style="min-height:1px;"></div></el-col>
      <el-col :span="18">
        <tag-list></tag-list>
        <tag-list></tag-list>
        <tag-list></tag-list>
        <card></card>
        <card></card>
        <card></card>
        <pagination></pagination>
      </el-col>
      <el-col :span="3"><div style="min-height:1px;"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import Card from '@/components/Card/index'
import TagList from './components/TagList'
import Pagination from "../../components/Pagination/index";
export default {
  name: 'UserSpace',
  components: {Pagination, Card, TagList },
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>
