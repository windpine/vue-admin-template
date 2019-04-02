<template>
  <div class="app-container">

    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="文件名" style="width: 200px;" class="filter-item" />
      <el-select v-model="listQuery.uploader" placeholder="创建者" clearable style="width: 130px" class="filter-item">
        <el-option v-for="item in uploaderOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.tag" placeholder="标签" clearable class="filter-item" style="width: 90px">
        <el-option v-for="item in tagOptions" :key="item.key" :label="item.index+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.sort" placeholder="请选择" style="width: 140px" class="filter-item" >
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search">搜索</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="showUploadDialog('normal')">
        上传
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="multipleDownload" >下载</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      style="width: 100%;"
      highlight-current-row
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="30"/>
      <el-table-column align="center" type="index" label="ID" width="95"/>
      <el-table-column label="Commit" width="130" align="center">
        <template slot-scope="scope">
          {{ scope.row.commit }}
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip = "showOverflow" label="文件名">
        <template slot-scope="scope">
          <span>{{ scope.row.fileName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建者" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.uid }}
        </template>
      </el-table-column>
      <el-table-column label="类型" class-name="status-col" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.fileType }}
        </template>
      </el-table-column>
      <el-table-column label="大小" class-name="status-col" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.size }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="created_at" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="280" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-row style="padding-bottom: 10px;">
            <el-button type="primary" size="small" @click="showVersionFileDialog(scope.row.fileId)">历史文件</el-button>
            <el-button type="primary" size="small" @click="showUploadDialog('version',scope.row.commit)">上传新版本</el-button>
          </el-row>
          <el-row>
            <el-button size="small" >
              下载
            </el-button>
            <el-button size="small" type="danger" >
              删除
            </el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <!--查看文件历史记录-->
    <el-dialog :visible.sync="dialogVersionFileVisible" title="历史提交记录">
      <el-table :data="versionFiles" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="commit" label="commit" />
        <el-table-column prop="uid" label="创建者" />
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column prop="description" label="提交描述"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVersionFileVisible = false">确认</el-button>
      </span>
    </el-dialog>

    <!--文件上传-->
    <el-dialog :visible.sync="uploadFileVisible" :title="uploadType+'文件上传'">
      <upload-file :type="uploadType" :parent-file-commit="parentFileCommit"/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeUploadDialog">确认</el-button>
      </span>
    </el-dialog>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
  </div>
</template>

<script>
import { getDataFileListAll, zipFiles, getAllVersionFile} from '@/api/file'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import UploadFile from '@/views/datafile/upload'

export default {
  name: 'AllFile',
  components: { Pagination, UploadFile },
  directives: { waves },
  data() {
    return {
      multipleSelection: [],
      list: null,
      total: 0,
      listQuery: {
        filename: '',
        uploader: [],
        tag: [],
        sort: [],
        page: 1,
        limit: 10
      },
      uploadType: '',
      uploaderOptions: [],
      sortOptions: [],
      tagOptions: [],
      listLoading: true,
      downloadLoading: false,
      showOverflow: false,
      dialogVersionFileVisible: false,
      downloadMultiFileVisible: false,
      uploadFileVisible: false,
      versionFiles: [],
      parentFileCommit: ''
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
        this.list = response.data.content
        // this.list = response.data
        // this.total = response.total
        this.total = response.data.totalElements
        this.listLoading = false
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    multipleDownload() {
      const formData = new FormData()
      this.multipleSelection.forEach(item => {
        formData.append('fileNameList[]', item.fileName)
      })
      zipFiles(formData).then(response => {
        console.log(response)
        const fileName = response.data
        const link = document.createElement('a')
        // TODO 封装get方法url参数构造
        link.href = `http://localhost:8080/file/download?filename=${fileName}&keyfrom=zip`
        link.click()
        window.URL.revokeObjectURL(link.href)
      })
    },
    showUploadDialog(type, commit) {
      this.parentFileCommit = commit
      this.uploadFileVisible = true
      this.uploadType = type
    },
    closeUploadDialog() {
      this.uploadFileVisible = false
      // TODO 刷新当前页面
    },
    showVersionFileDialog(parentId) {
      const query = {
        fileId: parentId
      }
      getAllVersionFile(query).then(response => {
        console.log(response)
        this.versionFiles = response.data
      })
      this.dialogVersionFileVisible = true
    }
  }
}
</script>

<style scoped>

</style>
