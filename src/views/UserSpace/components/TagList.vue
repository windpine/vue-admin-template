<template>
  <div>
    <label>{{ type }}</label>
    <el-tag v-for="(item, index) in tagList" :key="index">{{ item }}</el-tag>
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
        return ['金融', '通信', '教育']
      }
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>
