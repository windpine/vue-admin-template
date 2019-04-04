<template>
  <div style="background-color: #f8f8f8">
    <el-row>
      <el-col :span="2"><div style="min-height:1px;"/></el-col>
      <el-col :span="20" style="background-color: #ffffff">
        <div style="height: 20px; "/>
        <el-row>
          <el-col :span="12">
            <img src="../../assets/photo-card.jpg" height="90%" width="90%">
          </el-col>
          <el-col :span="12" style="margin-top: 50px">
            <em class="em1">
              <span class="sp1">
                20万框监控场景下人体检测数据
              </span>
              <p/>
              <span class="sp2">
                20万框监控场景下人体检测数据。监控场景包括室内（商场、超市、地铁）和室外（街道），包含少数超密集场景。数据涵盖男性女性...
              </span>
            </em>
            <div style="margin-top: 20px">
              <el-button type="primary">下载数据</el-button>
              <el-button type="primary" @click="showUploadDialog">上传新版本数据</el-button>
            </div>
          </el-col>
        </el-row>
        <div class="detail-tile">
          <span>相关推荐</span>
        </div>
        <el-row style="margin-bottom: 50px">
          <el-col
            v-for="(item,index) in 4"
            :span="6"
            :key="index">
            <a>
              <img
                src="../../assets/photo-card.jpg"
                height="100%"
                width="100%"
                style="display: block;"
                align="bottom"
              >
              <span style="padding-left: 120px">测试 {{ index + 1 }}</span>
            </a>
          </el-col>
        </el-row>
        <div class="detail-tile">
          <span>数据介绍</span>
        </div>
        <div class="data-description">
          <p>test</p>
        </div>
        <div class="detail-tile">
          <span>数据规格</span>
        </div>
        <div class="data-detail">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="180"/>
            <el-table-column
              prop="name"
              label="姓名"
              width="180"/>
            <el-table-column
              prop="address"
              label="地址"/>
          </el-table>
        </div>
        <div style="min-height: 10px"/>
        <div class="detail-tile">
          <span>其他版本</span>
        </div>
        <div class="data-detail">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="180"/>
            <el-table-column
              prop="name"
              label="姓名"
              width="180"/>
            <el-table-column
              prop="address"
              label="地址"/>>
          </el-table>
          <pagination :total="100"></pagination>
        </div>
      </el-col>
      <el-col :span="2"><div style="min-height:1px;"/></el-col>
    </el-row>
    <el-dialog :visible.sync="uploadFileVisible" title="新版本文件上传">
      <upload-file :type="'version'"/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeUploadDialog">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import UploadFile from '../../views/datafile/upload'
import Pagination from '../../components/Pagination/index'
export default {
  name: 'DataDetail',
  components: { Pagination, UploadFile },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      uploadFileVisible: false
    }
  },
  methods: {
    showUploadDialog() {
      this.uploadFileVisible = true
    },
    closeUploadDialog() {
      this.uploadFileVisible = false
      // TODO 刷新当前页面
    }
  }
}
</script>

<style scoped>
  .el-carousel__item:nth-child(2n) {
    background-color: #d3dce6;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #97a8be;
  }
  .detail-tile {
    margin-left: 50px;
  }
  .data-description {
    margin-left: 80px;
  }
  .data-detail {
    margin-left: 67px;
  }
  .sp1{
    font-weight: bold;
    font-size: 14pt;
    font-style: normal;
  }
  .sp2 {
    font-weight: lighter;
    font-style: normal;
    font-size: 12pt;
  }

</style>

