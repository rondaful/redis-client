<template>
    <el-row class="redis-panel">
        <el-col :span="19" class="redis-scroll">
            <!--<ol class="details" v-if="Object.keys(this.key).length">-->
                <!--<li v-for="(obj, index) in tempKey" v-html="formatVal(obj)">-->

                <!--</li>-->
            <!--</ol>-->
            <div v-if="key.length">
                {{this.key}}
            </div>
            <!--<key-table :tempKey="key" v-if="key.length"/>-->
            <span v-else style="color:#f00;padding:10px 15px;display:inline-block;">* 暂无信息 *</span>
        </el-col>
        <el-col :span="4" class="keyList-scroll" :push="1">
            <el-input suffix-icon="el-icon-search" clearable v-model="filter"></el-input>
            <div class="keys-wrapper">
                <ul class="keys">
                    <li v-for="key in filterKeys"
                        :key="key.key"
                        :class="key.key === currentKey ? 'current' : ''"
                        @click="clickKey(key.key)"
                    >{{key.key}}（{{key.type|type}}）</li>
                </ul>
            </div>
        </el-col>
    </el-row>
</template>
<script>
    export default {
        name: 'redis-panel',
        components: {
            keyTable:require('./key-table').default
        },
        data(){
            return {
                keys:[],
                filter:'',
                key:{},
                currentKey:'',
                tempKey2: '{"username": "andy","age": 20,"info": {"tel": "123456","cellphone": "98765"},"address": [{"city": "beijing","postcode": "222333"}, {"city": "newyork","postcode": "555666"}]}',
                tempKey: [{
                            "sid": 1,
                            "country": 'australia',
                            "siteid": 15,
                            "abbreviation": "AU",
                            "current": "AUD",
                            "name": "\u6fb3\u5927\u5229\u4e9a\u70b9",
                            "symbol": "AU $",
                            "show": 1,
                            "up_date": 1492082319,
                            "vat": 0,
                            "time_zone": 7200
                        },{
                            "sid": 2,
                            "country": 'australia',
                            "siteid": 15,
                            "abbreviation": "AU",
                            "current": "AUD",
                            "name": "\u6fb3\u5927\u5229\u4e9a\u70b9",
                            "symbol": "AU $",
                            "show": 1,
                            "up_date": 1492082319,
                            "vat": 0,
                            "time_zone": 7200
                        },{
                            "sid": 3,
                            "country": 'australia',
                            "siteid": 15,
                            "abbreviation": "AU",
                            "current": "AUD",
                            "name": "\u6fb3\u5927\u5229\u4e9a\u70b9",
                            "symbol": "AU $",
                            "show": 1,
                            "up_date": 1492082319,
                            "vat": 0,
                            "time_zone": 7200
                        }]
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
            // this.$http('get', '/redis/keys').then(res =>{
            //     this.keys = res;
            // });
            this.key = this.tempKey;
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
                // this.currentKey = key;
                // this.$http('get', '/redis/look', {key}).then(res =>{
                //     this.key =res;
                // });
                this.key = this.tempKey;
            },
            formatVal(obj) {
                var formatObj = obj;
                let tempStr = '';

                console.log(formatObj)
                for(var i in formatObj){
                    if(typeof formatObj[i] == 'object' &&formatObj[i]!=null){
                        for(var attr in formatObj[i]){
                            if(typeof formatObj[i][attr] == 'object' &&formatObj[i][attr]!=null){
                                for(var attr1 in formatObj[i][attr]){
                                    tempStr += '<span style="display:block;">' + attr1 + ':'+ formatObj[i][attr][attr1] + '</span>';
                                }
                            }else{
                                console.log(formatObj[i][attr]);
                                tempStr += '<span style="display:block;">' + attr + ':'+ formatObj[i][attr] + '</span>';
                            }
                        }
                    }else {
                        console.log(formatObj[i]);
                        tempStr += '<span style="display:block;">' + i + ':'+ formatObj[i] +'</span>';
                    }
                }
                return tempStr;
            }
        }
    }
</script>
<style scoped lang="stylus">
    .redis-panel{
        height:calc(100% - 20px);
        .redis-scroll {
            border:1px solid #ccc;
            overflow-y: scroll;
        }
        .keys-wrapper{
            padding-top:10px;
            overflow: hidden;
            box-sizing:border-box;
            .keys{
                border:1px solid #c2c2c2;
                height:100%;
                overflow-y:scroll;
                box-sizing:border-box;
                li{
                    border-bottom:1px solid #c2c2c2;
                    height:42px;
                    line-height: 42px;
                    cursor: pointer;
                    padding:0 15px;
                    overflow: hidden;
                    &:hover{
                        background-color: #94a7ff;
                        color: #FFF;
                    }
                    &.current{
                        background-color: #ff5270;
                        color: #FFF;
                    }
                    &:last-of-type {
                        border-bottom:none;
                    }
                }
            }
        }
        .details {
            line-height:20px;
            color: #ee814f;
            width: 100%;
            & li {
                padding:8px 15px;
            }
            & li:hover {
                background-color: #888;
                color#fff;
            }
        }
    }
</style>


