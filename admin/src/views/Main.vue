<template>
  <el-container>
    <el-aside width="200px">
      <el-menu mode="vertical" style="height:100vh" :default-active="$route.path" router>
        <el-submenu
          v-for="(item, index) in menus.items"
          :index="index + 1"
          :key="`menu-item-${index}`"
        >
          <template slot="title">{{item.title}}</template>
          <el-menu-item
            v-for="(subItem, subIndex) in item.items"
            :index="subItem.path"
            :key="`menu-item-${index}-${subIndex}`"
          >{{subItem.title}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header height>我的前端实验室</el-header>
      <el-main height>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class Main extends Vue {
  menus = {
    items: [
      {
        title: "内容管理",
        items: [
          { title: "首页", path: "/home" },
          { title: "课程管理", path: "/coursesList" },
        ]
      },
      {
        title: "运营管理",
        items: [
          { title: "用户管理", path: "/user/list" }
        ]
      }
    ]
  };
}
</script>

<style>
</style>