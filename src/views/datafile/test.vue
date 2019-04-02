<template>
  <div>
    <el-button @click="Post">测试按钮</el-button>
    <el-button @click="jumpToPDF">打开PDF</el-button>
    <el-button><a :href="baseURL+zipFilename">下载服务器文件</a></el-button>
    <el-button @click="readZipFile">获取并存储服务器压缩文件</el-button>
    <el-button @click="readFilesFromDB">读取DB文件内容</el-button>

    <el-dialog :visible.sync="zipFileReviewVisible" title="压缩文件预览">
      <el-table :data="list" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="fileName" label="文件名" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeZipFileReview">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { testPost } from '@/api/file'
import JSZip from 'jszip'
import db from '@/utils/db'

export default {
  name: 'Test',
  data() {
    return {
      baseURL: 'http://localhost:8080/file/download?filename=',
      filename: '谭上鸥-需求分析与概要设计.pdf',
      zipFilename: 'test.zip',
      list: [],
      zipFileReviewVisible: false
    }
  },
  methods: {
    Post() {
      const formData = new FormData()
      formData.append('test', 'test')
      testPost(formData).then(response => {
        console.log(response)
      })
    },
    jumpToPDF() {
      const filename = this.filename
      console.log(filename)
      this.$router.push({ path: `/datafile/pdf` })
    },
    readZipFile() {
      fetch(this.baseURL + this.zipFilename)
        .then(function(response) {
          if (response.status === 200 || response.status === 0) {
            return Promise.resolve(response.blob())
          } else {
            return Promise.reject(new Error(response.statusText))
          }
        })
        .then(JSZip.loadAsync)
        .then(function(zip) {
          console.log(db)
          // 取得JSZip对象，包含完整的压缩文件内部目录结构
          zip.forEach((relativePath, zipEntry) => {
            const fileName = zipEntry.name
            zip.file(fileName).async('blob').then(text => {
              // TODO 可以考虑通过事务存储
              db.download_file.put({ fileName: fileName, content: text })
                .then(() => {
                  console.log('success add file to db')
                })
                .catch(error => {
                  console.log('Oops' + error)
                })
            })
          })
        })
    },
    readFilesFromDB() {
      db.download_file.each(item => {
        this.list.push(item)
      })
      this.zipFileReviewVisible = true
    },
    closeZipFileReview() {
      this.zipFileReviewVisible = false
      this.list.splice(0, this.list.length)
    }
  }
}
</script>

<style scoped>

</style>
