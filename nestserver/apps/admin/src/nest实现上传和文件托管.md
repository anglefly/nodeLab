# nest 实现文件上传和文件托管, 本地实践和 阿里云 oss 实现

## 本地实现一个 oss 文件托管

即实现一个简易版的不使用 阿里 oss 的文件托管服务

### 路由

在 app.controller.ts 中添加路由 /upload

```ts
  // 自定义一个路由为/upload的post接口
  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // 使用拦截器 拦截文件流
  async upload(@UploadedFile('file') file) {
    return {
      url: `http://localhost:3000/uploads/${file.filename}`
    }
  }
```

### 添加 module 层模块 app.module.ts 中

```ts
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest:'uploads' // 会在nestserver 文件夹下创建一个uploads 文件夹，并将文件存入此处
    }),
```

### 开启文件托管 让外部可以使用本地文件

注意

```ts
import { NestExpressApplication } from '@nestjs/platform-express';

const host = 3000

async function bootstrap() {
  // 由于nest 底层同时支持 express 和fastify,所以需要在create指定使用的基础框架
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
```

然后

```ts
// 由于nest 底层同时支持 express 和fastify,所以需要在create指定使用的基础框架
const app = await NestFactory.create<NestExpressApplication>(AppModule);
// app.enableCors() // 允许跨域
app.useStaticAssets('uploads', {
  // 第一个参数是指定文件夹路径，从项目根路径开始
  prefix: '/uploads', // 第二个参数是访问的前缀
});
```

## 阿里云 oss

其实有些前端可以直接配置前端来触发阿里云 oss， 但由于把阿里云 oss 需要 key 之类的验证，把这些内容放到前端不是很安全，所以需要后台来转发后相对安全一些

### 需要注册和使用阿里云 oss

在对象存储中新建存储空间，记得勾选公共读，然后获取 region 和 bucket 也就是下面会用的两个配置；

然后需要开通 accessKey ，在个人账号下有配置项 新建用户，记得勾选 编程访问； 创建结束后记得 添加权限

### 需要的包 1.0.2 版本

可在 npm 上搜索 oss multer 并安装

```sh
npm install --save multer-aliyun-oss
# or

yarn add multer-aliyun-oss
```

### 使用

```js
// multer 在nest中已经存在，这里只是看格式
const multer = require('multer');
const MAO = require('multer-aliyun-oss');

const upload = multer({
  storage: MAO({
    config: {
      region: '<region>', // 位置 例如 oss-cn-hangzhou
      accessKeyId: '<accessKeyId>',
      accessKeySecret: '<accessKeySecret>',
      bucket: '<bucket>', // 存储空教名称
    },
  }),
});
```

### 修改前端返回方式

main.ts 中

```ts
  // 自定义一个路由为/upload的post接口
  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // 使用拦截器 拦截文件流
  async upload(@UploadedFile('file') file) {

    return file // 使用阿里云

    // return {
    //   url: `http://localhost:3000/uploads/${file.filename}`
    // }
  }
```

> 如果使用后热更新报错 接口引用报错 请重启试试
