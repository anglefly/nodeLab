// 一个申明的补充示例，用于使用第三方插件时候，出现报错
declare module '@smallwei/avue' {
  export const install: () => any // 因为vue 的标准插件需要返回一个 install 的方法
}
