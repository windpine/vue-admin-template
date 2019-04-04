<template>
  <div>
    <el-card shadow="always">
      <el-row :gutter="20">
        <el-col :span="8"><img src="../../assets/photo-card.jpg" height="90%" width="90%"></el-col>
        <el-col :span="12">
          <em class="em1">
            <span class="sp1">
              <a href="javascript:void(0);" onclick="alert('click')">
                20万框监控场景下人体检测数据
              </a>
            </span>
            <p/>
            <span class="sp2">
              20万框监控场景下人体检测数据。监控场景包括室内（商场、超市、地铁）和室外（街道），包含少数超密集场景。数据涵盖男性女性...
            </span>
            <hr class="hr-style">
            <span class="sp3">
              <label class="keyword">监控，人体，多场景，多时段</label>
            </span>
          </em>
        </el-col>
        <el-col :span="4">
          <router-link :to="{path: jumpPath, query:{id: fileId}}">
            <el-button>
              查看详情
            </el-button>
          </router-link>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    fileId: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      text: 'test!!!',
      jumpPath: '/welcome/datadetail'
    }
  }
}
</script>

<style scoped>
  .el-card {
    margin-bottom:  50px;
  }
  .el-card .flow-img {
    width: 10%;
    height: 10%;
  }
  .el-card .em1 {
    font-style: normal;
  }
  .el-card .hr-style {
    size: 1px;
    width: 100%;
  }
  .el-card .sp1 span {
    margin-top: 10px;
  }
  .el-card .sp1 a {
    font-weight: bold;
    font-size: 16pt;
  }
  .el-card .sp2 {
    font-weight: lighter;
  }
  .el-card .sp3 .keyword{
    margin-top: 30px;
    color: #6d6d6d;
    font-weight: normal;
  }

</style>
