<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Commit" width="130" align="center">
        <template slot-scope="scope">
          {{ scope.row.commit }}
        </template>
      </el-table-column>
      <el-table-column label="Filename">
        <template slot-scope="scope">
          <span>{{ scope.row.filename }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Uploader" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.uploader }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.size }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="right" label="Actions" width="120">
        <template slot-scope="scope">
          <el-button
            size="mini">Edit</el-button>
          <el-button
            size="mini"
            type="danger">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getDataFileListAll } from '@/api/table'

export default {
  name: 'DataFile',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getDataFileListAll().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
