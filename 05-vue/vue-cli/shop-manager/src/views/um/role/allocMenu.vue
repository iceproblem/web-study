<template>
    <el-card shadow="never">
        <el-tree
                :data="menuTreeList"
                show-checkbox
                default-expand-all
                node-key="id"
                :props="defaultProps"
                ref="tree"
        >
        </el-tree>
        <div style="margin-top: 20px;" align="center">
            <el-button type="primary" @click="handleSave()">保存</el-button>
            <el-button  @click="handleClear()">清空</el-button>
        </div>
    </el-card>
</template>

<script>
    import {getLeftMenuAll, getRoleMenuWithId, editRoleMenuWithId} from './../../../api/adminApi'
    export default {
        name: "allocMemu",
        data() {
            return {
                menuTreeList: [
                ],
                defaultProps: {
                    children: 'children',
                    label: 'title'
                },
                // 角色的id
                roleId: null
            };
        },
        created(){
            this.treeList();
            // 处理id
            this.roleId = this.$route.query.roleId;
            this.getRoleMenu(this.roleId);
        },
        methods: {
            // 0. 获取菜单列表
            treeList(){
                getLeftMenuAll().then(response=>{
                    console.log(response);
                    if(response.status === 1){
                        console.log(response.data);
                        this.menuTreeList = response.data;
                    }
                });
            },
            // 1. 修改
            handleSave(){
                let checkedNodes = this.$refs.tree.getCheckedNodes();
                let checkedMenuIds = new Set();
                if(checkedNodes !== null && checkedNodes.length > 0){
                    for(let i=0; i<checkedNodes.length; i++){
                        let checkedNode = checkedNodes[i];
                        checkedMenuIds.add(checkedNode.id);
                    }
                }
                // 把集合转成数组
                let menuArr = Array.from(checkedMenuIds);
                let menuStr = menuArr.join(',');
                // console.log(menuStr);

                // 调用接口
                this.$confirm('是否分配菜单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    editRoleMenuWithId({id: this.roleId, menus: menuStr}).then((response)=>{
                        if(response.status === 1){
                            this.$message({
                                message: '更新成功!',
                                type: 'success',
                                duration: 1000
                            });
                            this.$router.back();
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
            // 2. 清空
            handleClear(){
                this.$refs.tree.setCheckedKeys([]);
            },
            // 3. 根据角色id获取选中的内容
            getRoleMenu(roleId){
                getRoleMenuWithId({id: roleId}).then((response)=>{
                    if(response.status === 1){
                        let menuIds = response.data.menus;
                        let checkedMenuIds = [];
                        console.log(menuIds);
                        if(menuIds !== undefined && menuIds !== null && menuIds !== ''){
                            checkedMenuIds = menuIds.split(',');
                        }
                        // console.log(checkedMenuIds);
                        this.$refs.tree.setCheckedKeys(checkedMenuIds);
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
