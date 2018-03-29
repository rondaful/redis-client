<template>
    <div class="key-handle">
        <el-row class="key-handle-top">
            <el-col class="table-top-left" :span="17">
                <span>String</span>
                <el-input type="text" class="table-top-input"/>
            </el-col>
            <el-col class="table-top-right" :span="7">
                <el-button plain type="primary">设置TTL</el-button>
                <el-button plain type="success" @click="rerender">重载键值</el-button>
                <el-button plain type="danger" icon="el-icon-delete" @click="delKey">删除</el-button>
                <el-button plain type="warning" @click="tipsMsg">Rename</el-button>
                <em>TTL:-1</em>
            </el-col>
        </el-row>
        <el-row class="key-size">
            <el-col :span="17">
                <span class="file-info">Value :</span><em class="file-size">size:4.22KB</em>
            </el-col>
        </el-row>
        <el-dialog
            title="重命名"
            width="30%"
            :visible.sync="viewDialog"
        >
            <el-form>
                <el-form-item label="当前值">
                    <el-input value="111" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="新值">
                    <el-input value="222"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="sloseDialog">取消</el-button>
                <el-button @click="submit" type="primary">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: "key-handle",
    props: {
        show: {}
    },
    data(){
      return {
          currentVal: '0'
      }
    },
    computed: {
        viewDialog() {
            return this.show;
        }
    },
    methods: {
        tipsMsg() {
            console.log(this.currentVal)
            if (this.currentVal) {
                this.$message('请选中要修改的数据');
                return;
            }
            this.show = true;
        },
        delKey() {
            console.log('delkey')
            if (this.currentVal) {
                this.$message('未选中要删除的数据');
                return;
            }
            this.$confirm('确认删除此条信息吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        rerender() {
            this.$notify.success({
                title: '提示',
                message: '操作完成！',
                showClose: false
            });
        },
        sloseDialog(val) {
            console.log('sloseDialog')
            this.show = false;
        },
        submit() {
            console.log('submit')
        }
    }
}
</script>
<style lang="stylus">
    .key-handle {
        padding:0 8px;
    }
    .key-handle-top {
        padding: 15px 0 8px 0;
    }
    .table-top-left {
        overflow: hidden;
        position:relative;
        span {
            line-height:24px;
            padding:0 10px;
            height:24px;
            font-weight:bold;
            font-size:12px;
        }
        span,
        .table-top-input {
            float:left;
        }
        .table-top-input{
            position:absolute;
            left:55px;
            right:0;
            height: 100%;
            width :initial;
            .el-input__inner {
                padding:0 0 0 5px!important;
                height:24px !important;
                line-height:24px !important;
            }
        }
    }
    .table-top-right {
        overflow: hidden;
    & em, & .el-button {
                border-color:#666;
                float:right;
                text-align:center;
                padding:6px 8px;
                margin:0 5px 0 0;
                font-size:12px;
                color:#666;
            }
    & em {
          padding:0;
          display:inline-block;
          line-height:26px;
          height:26px;
          font-style:normal;
          font-weight:bold;
      }
    }
    .key-size {
        padding:0 0 10px 4px;
        .file-info {
            font-size:14px;
            margin:0 5px 0 5px;
        }
        .file-size {
            color:#888;
            font-style:normal;
            font-size:13px;
        }
    }
</style>