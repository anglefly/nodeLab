// 这里是补充声明
import Vue from 'vue'
import { AxiosInstance } from 'axios'
import VueRouter, { Route } from 'vue-router';
declare module 'vue/types/vue' {
  interface Vue {
    // 3. 声明为 Vue 补充的东西
    $http: AxiosInstance,
    $httpajax: AxiosInstance,
    $router: VueRouter; // 这表示this下有这个东西
    $route: Route;
    $urls: any;
    $Message: any;
    $refs: any,
  }
}

// window.xxx 或者 document.xxxx 会报错，npm run build 失败
// interface Window {
//   axios: any;
// }
// ts3.4以上版本用上面的方法 否则用下面的方法
declare global {
  interface Window {
    axios: AxiosInstance,
  }
}
declare var document: Document;
// 如果这样还是失败的时候，请在使用decument的组件中写
// declare var document: any;

// 引入的插件声明 否则使用的组件会在npm run build 报错
// 当在其他组件使用 import { Button } from "element-ui" 时候需要
declare module "element-ui";
declare module "@smallwei/avue";
// import CollapseTransition from "element-ui/lib/transitions/collapse-transition";
declare module "element-ui/lib/transitions/collapse-transition";
