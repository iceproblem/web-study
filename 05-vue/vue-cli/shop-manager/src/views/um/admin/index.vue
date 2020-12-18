<template>
    <div class="app-container">
        <!--头部区域-->
        <el-card class="operate-top-card" shadow="never">
            <div>
                <i class="el-icon-search" style="font-size: 18px; margin-right: 3px;"></i>
                <span>筛选搜索</span>
                <el-button
                        class="btn-find"
                        size="mini"
                        type="primary"
                        style="float: right; margin-left: 10px;"
                        @click="handleSearchList"
                >
                    查询用户
                </el-button>
                <el-button
                        class="btn-clear"
                        size="mini"
                        style="float: right;"
                        @click="handleResetSearch"
                >
                    重置
                </el-button>

            </div>
            <div style="margin-top: 50px;">
                <el-form
                        ref="productCateForm"
                        :model="listQuery"
                        label-width="150px"
                        :inline="true"
                >
                    <el-form-item label="输入账号：" >
                        <el-input v-model="listQuery.username" placeholder="请输入账号"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <!--列表-->
        <div>
            <!--头部区域-->
            <el-card class="operate-top-card" shadow="never">
                <i class="el-icon-s-order" style="font-size: 18px; margin-right: 3px;"></i>
                <span>订单列表</span>
                <el-button class="btn-add" size="mini" @click="handleAdd()">添加</el-button>
            </el-card>
            <!--内容区域-->
            <div class="table-container">
                <el-table
                        ref="multipleTable"
                        :data="list"
                        v-loading="listLoading"
                        border
                        style="width: 100%"
                >
                    <el-table-column label="序号" width="60" align="center">
                        <template slot-scope="scope">{{(scope.$index + 1) + ((listQuery.pageNum-1)* listQuery.pageSize)}}</template>
                    </el-table-column>
                    <el-table-column label="管理员账户"  width="100" align="center">
                        <template slot-scope="scope">{{scope.row.username}}</template>
                    </el-table-column>
                    <el-table-column label="管理员姓名"  width="120" align="center">
                        <template slot-scope="scope">{{scope.row.nickname}}</template>
                    </el-table-column>
                    <el-table-column label="邮箱"  width="160" align="center">
                        <template slot-scope="scope">{{scope.row.email ? scope.row.email: '暂无'}}</template>
                    </el-table-column>
                    <el-table-column label="创建时间"  width="200" align="center">
                        <template slot-scope="scope">{{scope.row.createtime| timeFormat}}</template>
                    </el-table-column>
                    <el-table-column label="最后登录"  width="200"  align="center">
                        <template slot-scope="scope">{{scope.row.logintime | timeFormat}}</template>
                    </el-table-column>
                    <el-table-column label="是否启用"  width="100"  align="center">
                        <template slot-scope="scope">
                            <el-switch
                                    :disabled="scope.row.id === 1"
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
                                    :disabled="scope.row.id === 1"
                                    @click="handleSelectRole(scope.$index, scope.row)"
                            >
                                分配角色
                            </el-button>
                            <el-button
                                    size="mini"
                                    :disabled="scope.row.id === 1"
                                    @click="handleUpdate(scope.$index, scope.row)"
                            >
                                编辑
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    :disabled="scope.row.id === 1"
                                    @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button>
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
                    :title="isEdit ? '编辑管理员' : '添加管理员'"
                    :visible.sync="dialogVisible"
                    width="40%"
                    center>
                <el-form
                        :model="admin"
                        ref="adminForm"
                        label-width="150px"
                        class="demo-ruleForm"
                >
                    <el-form-item label="账号: ">
                        <el-input type="text" v-model="admin.username" style="width: 250px;"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名: ">
                        <el-input type="text" v-model="admin.nickname" style="width: 250px;"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱: ">
                        <el-input type="text"  v-model="admin.email" style="width: 250px;"></el-input>
                    </el-form-item>
                    <el-form-item label="密码: ">
                        <el-input type="password"  v-model="admin.password" style="width: 250px;"></el-input>
                    </el-form-item>
                    <el-form-item label="备注: ">
                        <el-input type="textarea" :row="5" v-model="admin.note" style="width: 250px;"></el-input>
                    </el-form-item>
                    <el-form-item label="是否启用: " >
                        <el-radio-group v-model="admin.status">
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
            <!--分配角色-->
            <el-dialog
                    title="分配角色"
                    :visible.sync="roleDialogVisible"
                    width="30%"
                    center>
                <el-select v-model="allocRoleIds" multiple placeholder="请选择" style="width: 90%;">
                    <el-option
                            v-for="item in allRoleList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleRoleDialogConfirm()">确 定</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {
        getAdminList,
        addAdmin,
        updateAdmin,
        deleteAdmin,
        getRoleWithAdmin,
        editRoleWithAdmin,
        getRoleList
    } from './../../../api/adminApi'
    import md5 from 'blueimp-md5'
    import config from './../../../config/config'
    // 1. 原始数据
    const defaultListQuery = {
        pageNum: 1,
        pageSize: 10,
        username: null
    };

    const defaultAdmin = {
        id: null,
        username: null,
        password: null,
        email: null,
        nickname: null,
        note: null,
        status: 1
    };

    export default {
        name: "index",
        data(){
            return {
                listQuery: Object.assign({}, defaultListQuery),
                list: null,
                listLoading: false,
                total: null,
                admin: Object.assign({}, defaultAdmin),
                isEdit: false,
                // 添加和编辑
                dialogVisible: false,
                // 记录编辑之前的密码
                passwordBefore: null,
                // 分配角色
                roleDialogVisible: false,
                // 选中的角色
                allocRoleIds: [],
                // 所有角色列表
                allRoleList: [],
                // 当前编辑的id
                allocAdminId: null
            }
        },
        created(){
            this.getList();
            // 获取所有的角色列表
            this.getAllRoleList();
        },
        methods: {
            // 1. 查询
            handleSearchList(){
                this.listQuery.pageNum = 1;
                this.getList();
            },
            // 2. 重置
            handleResetSearch(){
                this.listQuery = Object.assign({}, defaultListQuery);
                this.getList();
            },
            // 3. 改变每页显示的条数
            handleSizeChange(val) {
                this.listQuery.pageNum = 1;
                this.listQuery.pageSize = val;
                // 重新加载数据
                this.getList();
            },
            // 4. 当前页码发生改变
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                // 重新加载数据
                this.getList();
            },
            // 5. 获取列表数据
            getList(){
                this.listLoading = true;
                getAdminList(this.listQuery).then((response)=>{
                    console.log(response);
                    if(response.status === 1){
                        this.listLoading = false;
                        this.list = response.data.list;
                        this.total = response.data.total;
                    }
                })
            },
            // 6. 是否启用该账号
            handleShowStatusChange(index, row){
                this.$confirm('是否修改该账户的启用状态?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    updateAdmin({id: row.id, status: row.status}).then((response)=>{
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
            // 7. 添加一个管理员
            handleAdd(){
                this.dialogVisible = true;
                this.isEdit = false;
                this.admin =Object.assign({}, defaultAdmin);
            },
            // 8. 编辑或者添加
            handleDialogConfirm(){
                this.$confirm('是否确认该操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if(this.isEdit){ // 编辑操作
                        let password = this.admin.password;
                        if(password !== this.passwordBefore){
                            this.admin.password = md5(password, config.KEY);
                        }
                        updateAdmin(this.admin).then((response)=>{
                            if(response.status === 1){
                                this.$message({
                                    message: '修改管理员信息成功!',
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
                        let password = this.admin.password;
                        password = md5(password, config.KEY);
                        this.admin.password = password;

                        addAdmin(this.admin).then((response)=>{
                            if(response.status === 1){
                                this.$message({
                                    message: '添加管理员成功!',
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
            // 9.分配角色
            handleSelectRole(index, row){
                this.roleDialogVisible = true;
                this.allocAdminId = row.id;
                // 获取当前管理员具备的角色
                this.getRoleListByAdmin(row.id);
            },
            // 10. 编辑角色
            handleUpdate(index, row){
                // 记录编辑之前的密码
                this.passwordBefore = row.password;
                console.log(this.passwordBefore);

                this.dialogVisible = true;
                this.isEdit = true;
                this.admin =Object.assign({}, row);
            },
            // 11.删除角色
            handleDelete(index, row){
                this.$confirm('是否删除该管理员?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteAdmin({id: row.id}).then((response)=>{
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
            // 12. 修改
            handleRoleDialogConfirm(){
                let roleid = this.allocRoleIds.join(',');
                editRoleWithAdmin({id: this.allocAdminId, roleid}).then((response)=>{
                    if(response.status === 1){
                        this.$message({
                            message: '分配成功!',
                            type: 'success',
                            duration: 1000
                        });
                        this.roleDialogVisible = false;
                    }else {
                        this.$message({
                            message: '分配失败!',
                            type: 'error',
                            duration: 1000
                        });
                    }
                })
            },
            // 13. 获取所有的角色列表
            getAllRoleList(){
                getRoleList({pageNum: 1, pageSize: 1000}).then((response)=>{
                    if(response.status === 1){
                        this.allRoleList = response.data.list;
                    }
                });
            },
            // 14. 获取当前管理员具备的角色
            getRoleListByAdmin(adminId){
                getRoleWithAdmin({id: adminId}).then(response=>{
                    if(response.status === 1){
                        let allocRoleIdsStr = response.data.roleid;
                        let tempArr = [];
                        this.allocRoleIds = [];
                        if(allocRoleIdsStr !== null && allocRoleIdsStr.length > 0){
                            tempArr = allocRoleIdsStr.split(','); // ["1", "2", "3"] --> [1, 2, 3]
                            for(let i=0; i<tempArr.length; i++){
                                this.allocRoleIds.push(Number(tempArr[i]));
                            }
                        }
                    }
                });
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
