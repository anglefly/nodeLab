<template>
  <el-container>
    <el-aside width="200px">
      <el-menu mode="vertical" style="height:100vh" :default-active="$route.path" router>
        <el-submenu
          v-for="(submenus, index) in menuData"
          :index="`submenu${index + 1}`"
          :key="`submenu${index + 1}`"
        >
          <template slot="title">{{submenus.title}}</template>
          <el-menu-item
            v-for="(item, subIndex) in submenus.children"
            :key="(index + 1) + '-' + (subIndex + 1)"
            :index="item.path"
          >{{item.title}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header height>
        <h2>这是一个后台管理界面</h2>
      </el-header>
      <el-main height>
        <!-- key 作用是 为了让 路由加载的方式 通过什么形式来重新加载，此处设置未路由的路径 -->
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Main extends Vue {
  menuData = [
    {
      title: "内容管理",
      children: [
        { name: "home", title: "首页", path: "/" },
        { name: "article", title: "文章管理", path: "/articles/crud" },
        { name: "category", title: "分类管理", path: "/categories/crud" },
        { name: "tag", title: "标签管理", path: "/tags/crud" },
      ],
    },
    {
      title: "用户管理",
      children: [{ name: "user", title: "用户统计", path: "/users/crud" }],
    },
  ];
}
</script>

<style>
</style>
