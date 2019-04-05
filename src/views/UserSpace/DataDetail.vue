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
                {{ fileData.fileName }}
              </span>
              <p/>
              <span class="sp2">
                {{ fileData.description }}
              </span>
            </em>
            <div style="margin-top: 20px">
              <el-button type="primary"><a :href="downloadFileLink">下载数据</a></el-button>
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
          <span>数据规格</span>
        </div>
        <div class="data-detail">
          <el-table
            :data="customAttributes"
            style="width: 100%">
            <el-table-column prop="customAttributeKey" label="规格名"/>
            <el-table-column prop="customAttributeValue" label="规格值" />
          </el-table>
        </div>
        <div style="min-height: 10px"/>
        <div class="detail-tile">
          <span>其他版本</span>
        </div>
        <div class="data-detail">
          <el-table
            :data="versionFiles"
            style="width: 100%">
            <el-table-column prop="commit" label="commit"/>
            <el-table-column prop="uid" label="创建者" />
            <el-table-column prop="createTime" label="创建时间"/>
            <el-table-column prop="description" label="提交描述"/>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small"><a :href="downloadVersionFileLink(scope.row.commit)">下载</a></el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination :total="100"/>
        </div>
      </el-col>
      <el-col :span="2"><div style="min-height:1px;"/></el-col>
    </el-row>
    <el-dialog :visible.sync="uploadFileVisible" title="新版本文件上传">
      <upload-file
        :type="'version'"
        :parent-file-commit="fileData.commit"
        :parent-data-type="fileData.dataType"/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeUploadDialog">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDataFileById, zipFiles, getAllVersionFile, downloadFile } from '@/api/file'
import UploadFile from '../../views/datafile/upload'
import Pagination from '../../components/Pagination/index'
export default {
  name: 'DataDetail',
  components: { Pagination, UploadFile },
  data() {
    return {
      uploadFileVisible: false,
      fileQuery: {
        fileId: this.$route.query.id
      },
      fileData: {},
      customAttributes: [],
      versionFiles: [],
      downloadFileLink: ''
    }
  },
  computed: {
    downloadVersionFileLink() {
      return function(commit) {
        return this.downloadFileLink + '&commit=' + commit
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getDataFileById(this.fileQuery).then(response => {
        this.fileData = response.data.dataFile
        this.customAttributes = response.data.customAttributes
        this.downloadFileLink = process.env.BASE_URL +
          '/file/download?fileName=' +
          this.fileData.fileName +
          this.fileData.fileType
      })
      getAllVersionFile(this.fileQuery).then(response => {
        this.versionFiles = response.data
      })
    },
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

