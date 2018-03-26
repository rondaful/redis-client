<template>
  <div class="tabTabe-content">
    <el-table
      :data="dataList"
      style="width: 100%"
      v-if="dataList"
      >
      <el-table-column
        label="值"
        width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <span v-else>暂无数据</span>
  </div>
</template>
<script>
export default {
  name: 'tab-tabel',
  props: ['dataList'],
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) { //删除事件
      console.log(index, row);
      const that = this;
      this.$confirm('确认删除？')
      .then(function() {
        that.dataList.map((obj, i) => {
          if(i === index) {
            that.dataList.splice(i, 1)
          } else return obj;
        });
      })
      .catch(err => console.log(err))
    }
  }
}
</script>
<style scoped>
  .has-gutter tr:nth-of-type(1) th:nth-of-type(1) {
    min-width: 120px;
  }
</style>


