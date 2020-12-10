<template>
  <el-aside :width="isCollapse ? '64px' : '200px'">
    <el-menu
        :default-active="activeId"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        :collapse-transition="false"
    >
      <div v-for="(item,index) in menuList" :key="index">
        <el-menu-item
            v-if="!item.children"
            :index="item.id"
            @click="dealNavLink(item._key,item.id)"
            :key="index"
        >
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
        <el-submenu v-else :index="item.id">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item
              v-for="(subItem) in item.children"
              :index="subItem.id"
              :key="subItem.id"
              @click="dealNavLink(subItem._key,subItem.id)"
          >
            <template slot="title">
              <i :class="subItem.icon"></i>
              <span slot="title">{{ subItem.title }}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </div>
    </el-menu>
  </el-aside>
</template>

<script>
import menuConfig from "../config/menuConfig.json"
export default {
  name: "LeftAside",
  props:{
    isCollapse:{
      type:Boolean
    }
  },
  created(){
    this.activeId = window.sessionStorage.getItem("activeId")
  },
  data(){
    return{
      menuList:menuConfig,
      activeId:"", // 被激活的ID
    }
  },
  methods: {
    dealNavLink(activePath,activeId){
      window.sessionStorage.setItem("activeId",activeId);
      this.activeId = activeId;

      this.$router.push(activePath)
    }
  },
}
</script>

<style scoped>

</style>