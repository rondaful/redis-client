<template>
  <div id="app">
    <!-- <router-view/> -->
    <div class="left-container">
      <div id="header">
        <el-button
          size="small"
          @click="addTab(editableTabsValue)"
        >
          添加 Tab
        </el-button>
        <el-tabs v-model="activeClass" type="card" closable @tab-remove="removeTab" @tab-click="getData">
          <el-tab-pane
            v-for="(item, index) in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
          <tab-content :dataList="dataList">
            {{item.content}}
          </tab-content>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="right-container">
      <div class="data-container">
        <div class="part-tit">搜索 :</div>
        <el-select v-model="currentSele" filterable placeholder="请选择" clearable v-if="dataList.length">
          <el-option
            v-for="(item, index) in dataList"
            v-if="item.value"
            :key="item.index"
            :value="item.value"
          >
          </el-option>
      </el-select>
      </div>
    </div>
  </div>
</template>

<script>
import tabContent from './components/tabContent';

export default {
  name: 'App',
  components: {
    'tab-content': tabContent
  },
  data() {
    return {
      activeClass: '0',
      value: '',
      dataList: [{value:0}],
      tabIndex:0,
      editableTabs: [{
        title: '服务器1',
        name: '0',
        content: 'Tab 1 content'
      },{
        title: '服务器2',
        name: '1',
        content: 'Tab 2 content'
      },{
        title: '服务器3',
        name: '2',
        content: 'Tab 3 content'
      }],
      editableTabsValue: '',
      currentSele: ''
    }
  },
  beforeMount() {
    this.getData();
  },
  methods:{
    addTab(targetName) {
      let newTabName ='新增服务器'+ ++this.tabIndex + '';
      this.$prompt('输入新标签的名字', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\s{0,}[\S]{1,}[\s\S]{0,}/,
        inputErrorMessage: '请重新输入'
      }).then((value) => {
           this.editableTabs.push(
             {
             'title': value.value,
             'name': this.$data.editableTabs.length +1 + '',
             'content': 'Tab' + value.value + 'content'
             }
           )
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          })
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    getData() {
      console.log('getData');
      var url = 'http://172.20.1.13:8081/redis/keys';

      this.$nextTick(() => {
        this.$http('GET' , url).then((res) => {
          console.log(res);
          this.dataList = res.map((obj, i) => {
            return {value: obj}
          })
        })
      })
    }
  }
}
</script>

<style>
html,body {margin:0;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  height:100%;
}
html,body,
.left-container,
.right-container {
  height:100%;
}
.left-container {
  position: absolute;
  left: 0;
  right: 300px;
  top:0;
  bottom:0;
}
.right-container {
  float: right;
  width:300px;
  border-left:1px solid #ccc;
  box-sizing:border-box;
  padding:100px 0 0 20px;
}
.right-container .part-tit {
  margin-bottom: 8px;
}
</style>
