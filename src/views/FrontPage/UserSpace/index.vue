<template>
  <div>
    <div class="banner__wrapper">
      <!-- 这个div设置为宽度100%，并且溢出显示隐藏 -->
      <div class="banner__inner">
        <!-- 这个div设置为和img图片同样的宽高，并且用absolute定位设置为居中 -->
        <div class="banner-img__wrapper">
          <img src="../../../assets/banner.jpg">
        </div>
      </div>
    </div>
    <el-row style="background-color: #ffffff">
      <el-col :span="2"><div style="min-height:1px;"/></el-col>
      <el-col :span="20">
        <div style="min-height: 20px"/>
        <el-tabs v-model="listQuery.activeTag" @tab-click="handleTagClick">
          <el-tab-pane label="不限" name="none"/>
          <el-tab-pane label="图像数据" name="photo"/>
          <el-tab-pane label="音视频数据" name="audio"/>
          <el-tab-pane label="视频数据" name="video"/>
          <el-tab-pane label="文档数据" name="document"/>
        </el-tabs>
        <div style="min-height: 10px"/>
      </el-col>
      <el-col :span="2"><div style="min-height:1px;"/></el-col>
    </el-row>
    <!--TODO  排序等操作栏-->
    <el-row :gutter="20" style="background-color: #f4f4f4">
      <el-col :span="2"><div style="min-height:1px;"/></el-col>
      <el-col :span="20">
        <div style="min-height: 20px"/>
        <card
          v-for="(item, index) in dataList"
          :key="index + '-card'"
          :v-loading="listLoading"
          :card-info="{
            fileId: item.fileId,
            fileName: item.fileName,
            description: item.description
        }"/>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="fetchData" />
      </el-col>
      <el-col :span="2"><div style="min-height:1px;"/></el-col>
    </el-row>
  </div>
</template>

<script>
import { getDataFileListAll } from '@/api/file'
import Card from '@/components/Card/index'
import TagList from './components/TagList'
import Pagination from '../../../components/Pagination/index'
export default {
  name: 'UserSpace',
  components: { Pagination, Card, TagList },
  data() {
    return {
      dataList: [],
      total: 0,
      listQuery: {
        filename: '',
        tag: [],
        sort: [],
        page: 1,
        limit: 10,
        activeTag: 'none'
      },
      photoTagList: ['不限', '智能医疗', '试题合集', 'OCR', '安防'],
      audioTagList: ['不限', '智能客服', '智能手机', '智能家居'],
      textTagList: ['不限', '机器翻译', '自然语言处理'],
      listLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getDataFileListAll(this.listQuery).then(response => {
        // TODO 处理数据
        this.dataList = response.data.content
        console.dataList
        // this.list = response.data
        // this.total = response.total
        this.total = response.data.totalElements
        this.listLoading = false
      })
    },
    handleTagClick() {
      this.fetchData()
    }
  }
}
</script>

<style scoped>
  hr.divide-line {
    border: 0;
    width: 100%;
    margin-left: inherit;
    margin-bottom: 10px;
    background: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.75), rgba(0,0,0,0));
  }
  .banner-img__wrapper {
    position: absolute;
    width: 1920px;
    height: 500px;
    left: 50%;
    margin-left: -960px;
  }
  .banner__inner {
    position: relative;
    width: 100%;
    overflow: hidden;
    height: 500px;
  }
</style>
