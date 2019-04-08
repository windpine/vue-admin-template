<template>
  <div class="taglist">
    <label style="padding-right: 20px">{{ type }}</label>
    <el-radio-group v-for="(item,index) in tagList" :key="index" v-model="tagChoose" >
      <el-radio-button :label="item"></el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: 'TagList',
  props: {
    type: {
      type: String,
      default: '图像数据'
    },
    tagList: {
      type: Array,
      default: () => {
        return ['不限', '金融', '通信', '教育']
      }
    }
  },
  data() {
    return {
      tagChoose: ''
    }
  }
}
</script>

<style scoped>
  .taglist {
    margin-bottom: 10px;
  }
  .el-radio-button {
    padding-right: 10px;
  }

</style>
