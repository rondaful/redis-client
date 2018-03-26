<template>
    <el-dialog
            title="添加新的redis服务器"
            :visible.sync="show"
            width="30%">
        <el-form>
            <el-form-item label="名称：">
                <el-input v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="地址：">
                <el-input v-model="host"></el-input>
            </el-form-item>
            <el-form-item label="端口：">
                <el-input v-model="port"></el-input>
            </el-form-item>
            <el-form-item label="密码：">
                <el-input v-model="auth"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </span>
    </el-dialog>
</template>

<script>
    export default {
        name: "panel-new",
        data(){
            return {
                show:this.value,
                name:'',
                host:'',
                port:6379,
                auth:''
            }
        },
        methods:{
            cancel(){
                this.show = false;
                this.name = '';
                this.host = '';
                this.port = 6379;
                this.auth = '';
            },
            submit(){
                const post ={
                    host:this.host,
                    name:this.name,
                    port:this.port,
                    auth:this.auth,

                };
                this.$http('post', "/auth/add",post).then(res =>{
                    this.$emit('submit', res);
                }).catch(code =>{
                    this.$message({type:"error", message:code.message || code.fail || code.error});
                })
            }
        },
        watch:{
            value(val){
                this.show = val;
            },
            show(val){
                this.$emit('input', val);
            }
        },
        props:{
            value:{

            }
        },
    }
</script>

<style scoped>

</style>