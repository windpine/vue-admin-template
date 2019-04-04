<template>
  <div>
    <div class="banner__wrapper">
      <!-- 这个div设置为宽度100%，并且溢出显示隐藏 -->
      <div class="banner__inner">
        <!-- 这个div设置为和img图片同样的宽高，并且用absolute定位设置为居中 -->
        <div class="banner-img__wrapper">
          <img src="../../assets/banner.jpg">
        </div>
      </div>
    </div>
    <el-row style="background-color: #ffffff">
      <el-col :span="2"><div style="min-height:1px;"></div></el-col>
      <el-col :span="20">
        <div style="min-height: 20px"></div>
        <tag-list :type="'图像数据'" :tag-list="photoTagList"></tag-list>
        <hr class="divide-line"/>
        <tag-list :type="'语音数据'" :tag-list="audioTagList"></tag-list>
        <hr class="divide-line"/>
        <tag-list :type="'文本数据'" :tag-list="textTagList"></tag-list>
        <div style="min-height: 10px"></div>
      </el-col>
      <el-col :span="2"><div style="min-height:1px;"></div></el-col>
    </el-row>
    <!--TODO  排序等操作栏-->
    <el-row :gutter="20" style="background-color: #f4f4f4">
      <el-col :span="2"><div style="min-height:1px;"></div></el-col>
      <el-col :span="20">
        <div style="min-height: 20px"></div>
        <card></card>
        <card></card>
        <card></card>
        <pagination :total="100"></pagination>
      </el-col>
      <el-col :span="2"><div style="min-height:1px;"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import Card from '@/components/Card/index'
import TagList from './components/TagList'
import Pagination from '../../components/Pagination/index';
export default {
  name: 'UserSpace',
  components: { Pagination, Card, TagList },
  data() {
    return {
      dataList: [],
      listQuery: [],
      photoTagList: ['不限', '智能医疗', '试题合集', 'OCR', '安防'],
      audioTagList: ['不限', '智能客服', '智能手机', '智能家居'],
      textTagList: ['不限', '机器翻译', '自然语言处理']
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
