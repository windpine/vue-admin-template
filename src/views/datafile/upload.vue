<template>
  <div class="app-container">
    <label v-show="type.toString() === 'version'" style="margin-left: 100px; padding-bottom: 20px">
      每次仅允许上传一个新版本，且必须填写简介
    </label>
    <el-form ref="form" :model="form" label-width="120px" label-position="top" style="margin-left: 100px;">
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
          <div slot="tip" class="el-upload__tip" style="color: #F56C6C">只能上传单一尚未存在的数据文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item
        v-for="(item, index) in form.descriptions"
        :key="index + '-description'"
        :label="fileList[index].name+ '简介'"
        :prop="'descriptions.' + index + '.value'"
        :rules="formRules.value"
        label-width="200px">
        <el-input :rows="2" v-model="item.value" type="textarea" placeholder="请输入文件简介" style="width: 500px"/>
      </el-form-item>

      <el-form-item v-show=" fileList.length > 0 " :rules="formRules.dataType" prop="dataType">
        <el-select v-model="form.dataType" placeholder="请选择数据类型">
          <el-option
            v-for="(item,index) in dataTypeOptions"
            :key="index + '-dataType'"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>

      <el-row v-show="type.toString() === 'normal'" :gutter="2">
        <el-col :span="6">
          <el-form-item
            v-for="(item, index) in form.attributeKeys"
            :key="index + '-key'">
            <el-select
              v-model="item.value"
              filterable
              allow-create
              default-first-option
              placeholder="请选择属性名">
              <el-option-group
                v-for="group in keyOptions"
                :key="group.label"
                :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-option-group>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="18">
          <el-form-item v-for="(item, index) in form.attributeValues" :key="index + '-value'">
            <el-input v-model="item.value" type="text" placeholder="请输入属性值" style="width: 60%"/>
            <el-button @click.prevent="removeAttribute(index)">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button v-show="type.toString() === 'normal'" @click="addAttribute">新增自定义属性</el-button>
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
      required: true,
      default: 'normal'
    },
    parentFileCommit: {
      type: String,
      required: false,
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
    const validateDataType = (rule, value, callback) => {
      if (value == null || value === '') {
        callback(new Error('请选择数据类型'))
      } else {
        callback()
      }
    }
    return {
      form: {
        descriptions: [],
        attributeKeys: [],
        attributeValues: [],
        dataType: ''
      },
      formRules: {
        value: [{ validator: validateDescription }],
        dataType: [{ validator: validateDataType, trigger: 'change' }]
      },
      fileList: [],
      fileUploadLimit: 1,
      keyOptions: [{
        label: '通用',
        options: [{
          value: '格式详情',
          label: '格式详情'
        }, {
          value: '数据规模',
          label: '数据规模'
        }, {
          value: '数据'
        }]
      }, {
        label: '图像类型',
        options: [{
          value: '',
          label: '上海'
        }, {
          value: 'Beijing',
          label: '北京'
        }]
      }, {
        label: '音视频类型',
        options: [{
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }, {
          value: 'Dalian',
          label: '大连'
        }]
      }, {
        label: '文档类型',
        options: [{
          value: '',
          label: ''
        }, {
          value: '',
          label: ''
        }, {
          value: '',
          label: ''
        }, {
          value: '',
          label: ''
        }]
      }],
      dataTypeOptions: [
        {
          value: 'photo',
          label: '图像'
        }, {
          value: 'audio',
          label: '音频'
        }, {
          value: 'video',
          label: '视频'
        }, {
          value: 'document',
          label: '文档'
        }
      ]
    }
  },
  methods: {
    onSubmit() {
      // const form = this.$refs['form'].$el
      const formData = new FormData()
      const descriptions = this.form.descriptions
      const attributeKeys = this.form.attributeKeys
      const attributeValues = this.form.attributeValues
      descriptions.forEach(item => {
        formData.append('descriptions', item.value)
      })
      attributeKeys.forEach(item => {
        formData.append('customKeys', item.value)
      })
      attributeValues.forEach(item => {
        formData.append('customValues', item.value)
      })
      // TODO 获取当前登陆的用户uid
      formData.append('uid', '2')
      // 如果是普通的多文件上传，则走/multiple接口
      if (this.type.toString() === 'normal') {
        this.$refs['form'].validate(valid => {
          console.log(valid)
          if (valid) {
            if (this.fileList.length > 1) {
              this.fileList.forEach(item => {
                formData.append('files', item)
              })
              uploadMultiFiles(formData).then(response => {
                console.log(response)
                this.handleResponseMessage(response)
              })
            } else if (this.fileList.length === 1) {
              // 如果是单一文件，则走/upload接口
              const file = this.fileList[0]
              formData.append('files', file)
              uploadFile(formData).then(response => {
                console.log(response)
                this.handleResponseMessage(response)
              })
            }
          } else {
            alert('请补全信息')
            return false
          }
        })
      } else if (this.type.toString() === 'version') {
        // 版本文件每次仅允许上传一个
        this.fileUploadLimit = 1
        this.$refs['form'].validate(valid => {
          console.log(valid)
          if (valid) {
            const file = this.fileList[0]
            formData.append('versionFile', file)
            formData.append('parentFileCommit', this.parentFileCommit)
            uploadVersionFile(formData).then(response => {
              this.handleResponseMessage(response)
            })
          } else {
            alert('请补全信息')
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
      this.form.dataType = ''
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
    },
    addAttribute() {
      this.form.attributeKeys.push({
        value: ''
      })
      this.form.attributeValues.push({
        value: ''
      })
    },
    removeAttribute(index) {
      const attributeKeys = this.form.attributeKeys
      const attributeValues = this.form.attributeValues
      attributeKeys.splice(index, 1)
      attributeValues.splice(index, 1)
    }
  }
}
</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>

