<template>
    <el-row class="redis-panel">
        <el-col :span="20">
            sss
        </el-col>
        <el-col :span="4">
            <el-input suffix-icon="el-icon-search" clearable v-model="filter"></el-input>
            <ul class="keys">
                <li v-for="key in filterKeys"
                    :key="key.key"
                    :class="key.key === currentKey ? 'current' : ''"
                    @click="clickKey(key.key)"
                >{{key.key}}（{{key.type|type}}）</li>
            </ul>
        </el-col>
    </el-row>
</template>
<script>
    export default {
        name: 'tab-tabel',
        props: ['redis'],
        data(){
            return {
                keys:[],
                filter:'',
                key:{},
                currentKey:'',
            }
        },
        filters:{
            type(type){
                switch (type){
                    case 1:return 'string';
                    default:return 'not defined!';
                }
            }
        },
        mounted(){
            this.$http('get', '/redis/keys').then(res =>{
                this.keys = res;
            })
        },
        computed:{
            filterKeys(){
                return this.keys.filter(key =>{
                    return key.key.indexOf(this.filter) >= 0;
                });
            }
        },
        methods: {
            clickKey(key){
                this.currentKey = key;
                this.$http('get', '/redis/look', {key}).then(res =>{
                    this.key =res;
                });
            }
        }
    }
</script>
<style scoped lang="stylus">
    .redis-panel{
        height:100%;
        .keys{
            border-left:2px solid #c2c2c2;
            height:100%;
            overflow-y:auto;
            li{
                border-bottom:1px solid #c2c2c2;
                height:42px;
                line-height: 42px;
                cursor: pointer;
                padding:0 15px;
                &:hover{
                    background-color: #94a7ff;
                    color: #FFF;
                }
                &.current{
                    background-color: #ff5270;
                    color: #FFF;
                }
            }
        }
    }
</style>


