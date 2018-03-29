<template>
    <div id="app">
        <div class="left-container">
            <div id="header">
                <el-card type="card">
                    <el-button
                            size="small"
                            @click="addTab()"
                    >
                        添加 Tab
                    </el-button>
                </el-card>
                <panel-new v-model="showNewTab"
                           @submit="newTabEvent"
                ></panel-new>
                <el-tabs v-model="activeClass" type="card" closable @tab-remove="removeTab" class="tabs-card-wrapper">
                    <el-tab-pane
                            v-for="(redis, index) in redises"
                            :key="redis.id"
                            :label="redis.name"
                            :name="redis.id"
                    >
                        <redis-panel :redis="redis" class="tabs-content">
                        </redis-panel>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <key-handle></key-handle>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'App',
        components: {
            redisPanel:require('./components/redis-panel').default,
            panelNew:require('./components/panel-new').default,
            keyHandle:require('./components/key-handle').default
        },
        data() {
            return {
                activeClass: '0',
                showNewTab: false,
                redises: [{value: 0,name: '默认'}],
                tabIndex: 0,
            }
        },
        created(){
            this.getRedises();
        },
        methods: {
            getRedises() {
                this.$http('get', "/auth/list").then(res =>{
                    this.redises = res;
                })
            },
            addTab() {
                this.showNewTab = true;
            },
            newTabEvent(redises){
                this.redises = redises;
            },
            removeTab(id) {
                console.log('id:', id, this.redises)

                this.$confirm('确定删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http('DELETE', "/auth/del",{id}).then(res =>{
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.redises = res;
                    }).catch((err) => console.log(err));
                 }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>

<style lang="stylus">
    *{
        list-style:none;
        margin:0;
        padding:0;
    }
    html,body,#app{
        margin:0;
        padding:0;
        height:100%;
        width:100%;
        overflow: hidden;
    }
    #header {
        height:calc(100% - 110px);
    }
    .left-container
    .el-tab-pane
    .keyList-scroll
    .redis-scroll{
        height:100%;
    }
    .tabs-card-wrapper {
        height:calc(100% - 74px);
    }
    .el-tabs__content {
        height:calc(100% - 56px);
    }
    .keys-wrapper {
        height:calc(100% - 40px);
    }
    .el-tab-pane {padding:0 10px;}
    #header {
        .el-button {
            border-color: #666;
            &:hover {
                border-color: #50a1de;
            }
        }
    }


</style>
