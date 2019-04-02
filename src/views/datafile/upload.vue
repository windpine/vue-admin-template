<template>
  <div class="app-container">
    <label v-show="type.toString() === 'version'" style="margin-left: 100px; padding-bottom: 20px">
      每次仅允许上传一个新版本，且必须填写简介
    </label>
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px" label-position="top" style="margin-left: 100px;">
      <el-form-item>
        <el-upload
          :http-request="handleFile"
          :multiple="true"
          :limit="fileUploadLimit"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          :file-list="fileList"
          action="">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item
        v-for="(item, index) in form.descriptions"
        :key="index"
        :label="fileList[index].name+ '简介'"
        :prop="'descriptions.' + index + '.value'"
        :rules="formRules.value"
        label-width="200px">
        <el-input :rows="2" v-model="item.value" type="textarea" placeholder="请输入文件简介" style="width: 500px"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { uploadFile, uploadMultiFiles, uploadVersionFile } from '@/api/file'
import { Message } from 'element-ui'
import { isNull } from '@/utils/validate'
export default {
  name: 'UploadFile',
  props: {
    type: {
      type: String,
      default: 'normal'
    },
    parentFileCommit: {
      type: String,
      default: ''
    }
  },
  data() {
    const validateDescription = (rule, value, callback) => {
      if (isNull(value)) {
        callback(new Error('请输入文件简介'))
      } else {
        callback()
      }
    }
    return {
      form: {
        descriptions: []
      },
      formRules: {
        value: [{ validator: validateDescription, trigger: 'blur' }]
      },
      fileList: [],
      fileUploadLimit: 5
    }
  },
  methods: {
    onSubmit() {
      const form = this.$refs['form'].$el
      const formData = new FormData(form)
      const descriptions = this.form.descriptions
      descriptions.forEach(item => {
        formData.append('descriptions', item.value)
      })
      // TODO 获取当前登陆的用户uid
      formData.append('uid', '2')
      // 如果是普通的多文件上传，则走/multiple接口
      if (this.type.toString() === 'normal') {
        if (this.fileList.length > 1) {
          this.fileList.forEach(item => {
            formData.append('files', item)
          })
          uploadMultiFiles(formData).then(response => {
            this.handleResponseMessage(response)
          })
        } else if (this.fileList.length === 1) {
          // 如果是单一文件，则走/upload接口
          const file = this.fileList[0]
          formData.append('files', file)
          uploadFile(formData).then(response => {
            this.handleResponseMessage(response)
          })
        }
      } else if (this.type.toString() === 'version') {
        // 版本文件每次仅允许上传一个
        this.fileUploadLimit = 1
        // TODO 校验description是否为空
        this.$refs['form'].validate(valid => {
          if (valid) {
            const file = this.fileList[0]
            formData.append('versionFile', file)
            formData.append('parentFileCommit', this.parentFileCommit)
            uploadVersionFile(formData).then(response => {
              this.handleResponseMessage(response)
            })
          } else {
            alert('请输入文件简介！')
            return false
          }
        })
      } else {
        Message({
          message: '不支持该类型上传操作',
          type: 'error',
          duration: 2 * 1000
        })
      }
    },
    handleFile(file) {
      const trueFile = file.file
      this.fileList.push(trueFile)
      this.form.descriptions.push({ filename: trueFile.name, value: '' })
    },
    handleRemove(file) {
      const descriptions = this.form.descriptions
      this.fileList.splice(this.fileList.findIndex(item => item.uid === file.uid), 1)
      descriptions.splice(descriptions.findIndex(item => item.filename === file.name), 1)
    },
    handleExceed(files) {
      this.$message.warning(`最多上传 ${this.fileUploadLimit} 个文件`)
    },
    handleResponseMessage(response) {
      console.log(response)
      if (response.errorCode.value === 20000) {
        Message({
          message: '成功上传',
          type: 'success',
          duration: 2 * 1000
        })
        this.form.descriptions.splice(0, this.form.descriptions.length)
        this.fileList.splice(0, this.fileList.length)
      }
    }
  }
}
</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>

