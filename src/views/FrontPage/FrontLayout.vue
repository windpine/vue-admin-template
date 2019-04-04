<template>
  <el-container>
    <el-header>
      <label>数据共享</label>
      <el-dropdown class="avatar-container" trigger="click" style="float: right">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" >LogOut</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="primary" style="float: right;" @click="showUploadDialog('normal')">上传</el-button>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>

    <!--文件上传-->
    <el-dialog :visible.sync="uploadFileVisible" title="普通文件上传">
      <upload-file :type="'normal'"/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeUploadDialog">关闭</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import UploadFile from '@/views/datafile/upload'
import { mapGetters } from 'vuex'
export default {
  name: 'FrontLayout',
  components: { UploadFile },
  data() {
    return {
      uploadFileVisible: false,
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
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

</style>
