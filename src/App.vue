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
                <el-tabs v-model="activeClass" type="card" closable>
                    <el-tab-pane
                            v-for="redis in redises"
                            :key="redis.name"
                            :label="redis.name"
                            :name="redis.name"
                    >
                        <redis-panel :redis="redis">
                        </redis-panel>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'App',
        components: {
            redisPanel:require('./components/redis-panel').default,
            panelNew:require('./components/panel-new').default
        },
        data() {
            return {
                activeClass: '0',
                showNewTab: false,
                value: '',
                redises: [{value: 0}],
                tabIndex: 0,
                currentSele: ''
            }
        },
        created(){
            this.$http('get', "/auth/list").then(res =>{
                this.redises = res;
            })
        },
        methods: {
            addTab() {
                this.showNewTab = true;
            },
            newTabEvent(redises){
                this.redises = redises;
            },
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
    }
</style>
