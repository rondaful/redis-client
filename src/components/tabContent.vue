<template>
  <div class="tab-content">
    <div class="filter-wrapper">

    </div>
    <div class="item-wrapper">
      <tab-tabel :dataList="this.dataList"/>
    </div>
  </div>
</template>
<script>
import tabTabel from './tabTabel'

export default {
  name: 'tab-content',
  components: {
    'tab-tabel': tabTabel
  },
  props: ['dataList'],
  mounted() {
    console.log(this.dataList)
  }
}
</script>

