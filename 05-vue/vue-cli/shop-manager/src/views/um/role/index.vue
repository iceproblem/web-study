<template>
    <div>
        <!--头部区域-->
        <el-card class="operate-top-card" shadow="never">
            <i class="el-icon-s-order" style="font-size: 18px; margin-right: 3px;"></i>
            <span>角色列表</span>
            <el-button class="btn-add" size="mini" @click="handleAdd()">添加</el-button>
        </el-card>
        <!--内容区域-->
        <div class="table-container">
            <el-table
                    :data="listData"
                    v-loading="listLoading"
                    border
                    style="width: 100%"
            >
                <el-table-column label="编号" width="100" align="center">
                    <template slot-scope="scope">{{(scope.$index + 1) + ((listQuery.pageNum-1)* listQuery.pageSize)}}
                    </template>
                </el-table-column>
                <el-table-column label="角色名称" width="200" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="角色描述" width="200" align="center">
                    <template slot-scope="scope">{{scope.row.description}}</template>
                </el-table-column>
                <el-table-column label="添加时间" width="200" align="center">
                    <template slot-scope="scope">{{scope.row.createTime | timeFormat}}</template>
                </el-table-column>
                <el-table-column label="是否启用" width="100" align="center">
                    <template slot-scope="scope">
                        <el-switch
                                @change="handleShowStatusChange(scope.$index, scope.row)"
                                v-model="scope.row.status"
                                :active-value="1"
                                :inactive-value="0">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleSelectMenu(scope.$index, scope.row)"
                        >分配菜单
                        </el-button>
                        <el-button
                                size="mini"
                                @click="handleUpdate(scope.$index, scope.row)"
                        >编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <div class="pagination-container">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="listQuery.pageNum"
                    :page-sizes="[5, 10, 15]"
                    :page-size="listQuery.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
        <!--面板-->
        <el-dialog
                :title="isEdit ? '编辑角色' : '添加角色'"
                :visible.sync="dialogVisible"
                width="40%"
                center>
            <el-form
                    :model="role"
                    ref="ruleForm"
                    label-width="150px"
                    class="demo-ruleForm"
            >
                <el-form-item label="角色名称: " prop="pass">
                    <el-input type="text" v-model="role.name" style="width: 250px;"></el-input>
                </el-form-item>
                <el-form-item label="角色描述: " prop="checkPass">
                    <el-input type="textarea" :row="5" v-model="role.description" style="width: 250px;"></el-input>
                </el-form-item>
                <el-form-item label="是否启用: " prop="age">
                    <el-radio-group v-model="role.status">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleDialogConfirm()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {addRole, getRoleList, editRole, delRole} from './../../../api/adminApi'
    // 1. 默认角色
    const defaultRole = {
        name: null,
        description: null,
        status: 1
    };
    const defaultListQuery = {
        pageNum: 1,
        pageSize: 5
    };
    export default {
        name: "index",
        data() {
            return {
                listQuery: Object.assign({}, defaultListQuery),
                listData: [
                    // {id: 1, name: '超级管理员', description: '查看和操作所有功能', createTime: '2020-07-20 16:30:23', status: 1}
                ],
                total: null,
                listLoading: false,
                // 控制面板的显示和隐藏
                dialogVisible: false,
                role: Object.assign({}, defaultRole),
                // 添加或编辑
                isEdit: false,
            }
        },
        created(){
            this.getList();
        },
        methods: {
            // 1. 添加一个角色
            handleAdd() {
                this.dialogVisible = true;
                this.isEdit = false;
                this.role =Object.assign({}, defaultRole);
            },
            // 2. 编辑角色
            handleUpdate(index, row){
                this.dialogVisible = true;
                this.isEdit = true;
                this.role =Object.assign({}, row);
            },
            // 3. 点击确认 (添加 或 编辑)
            handleDialogConfirm(){
                this.$confirm('是否确认该操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if(this.isEdit){ // 编辑操作
                        editRole(this.role).then((response)=>{
                            console.log(response);
                            if(response.status === 1){
                                this.$message({
                                    message: '修改角色成功!',
                                    type: 'success',
                                    duration: 1000
                                });
                                this.dialogVisible = false;
                                this.getList();
                            }else {
                                this.$message({
                                    message: response.msg,
                                    type: 'warning',
                                    duration: 1000
                                });
                            }
                        }).catch((error)=>{
                            this.$message({
                                message: error.msg,
                                type: 'error',
                                duration: 1000
                            });
                        });
                    }else { // 添加操作
                        addRole(this.role).then((response)=>{
                            console.log(response);
                            if(response.status === 1){
                                this.$message({
                                    message: '添加角色成功!',
                                    type: 'success',
                                    duration: 1000
                                });
                                this.dialogVisible = false;
                                this.getList();
                            }else {
                                this.$message({
                                    message: response.msg,
                                    type: 'warning',
                                    duration: 1000
                                });
                            }
                        }).catch((error)=>{
                            this.$message({
                                message: error.msg,
                                type: 'error',
                                duration: 1000
                            });
                        });
                    }
                });
            },
            // 4. 获取列表的数据
            getList(){
                this.listLoading = true;
                getRoleList(this.listQuery).then(response=>{
                    if(response && response.status === 1){
                        this.listLoading = false;
                        this.listData = response.data.list;
                        this.total = response.data.total;
                    }
                })
            },
            // 5. 改变每页显示的条数
            handleSizeChange(val) {
                this.listQuery.pageNum = 1;
                this.listQuery.pageSize = val;
                // 重新加载数据
                this.getList();
            },
            // 6. 当前页码发生改变
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                // 重新加载数据
                this.getList();
            },
            // 7. 是否启用该角色
            handleShowStatusChange(index, row){
                this.$confirm('是否修改该角色的启用状态?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    editRole({id: row.id, status: row.status}).then((response)=>{
                        console.log(response);
                        if(response.status === 1){
                            this.$message({
                                message: '修改成功!',
                                type: 'success',
                                duration: 1000
                            });
                            this.getList();
                        }else {
                            this.$message({
                                message: response.msg,
                                type: 'warning',
                                duration: 1000
                            });
                        }
                    }).catch((error)=>{
                        this.$message({
                            message: error.msg,
                            type: 'error',
                            duration: 1000
                        });
                    });
                });
            },
            // 8. 删除一个角色
            handleDelete(index, row){
                this.$confirm('是否删除该角色?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delRole({id: row.id}).then((response)=>{
                        if(response.status === 1){
                            this.$message({
                                message: '删除成功!',
                                type: 'success',
                                duration: 1000
                            });
                            this.getList();
                        }else {
                            this.$message({
                                message: response.msg,
                                type: 'warning',
                                duration: 1000
                            });
                        }
                    }).catch((error)=>{
                        this.$message({
                            message: error.msg,
                            type: 'error',
                            duration: 1000
                        });
                    });
                });
            },
            // 9. 分配菜单
            handleSelectMenu(index, row){
                this.$router.push({
                    path: '/um/allocMenu',
                    query: {roleId: row.id}
                })
            }
        },
        filters: {
            timeFormat(value){
                if(value === null || value === undefined || value === ''){
                    return '暂无数据';
                }
                return  value;
            }
        }
    }
</script>

<style scoped>

</style>
