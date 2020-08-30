# Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Preparatory work

```bash
# install
$ npm i -g @nestjs/cli

# create project
$ nest new project-name
```

### 选用分体模式，admin 对接内部服务，nestserver 是对接普通服务

```bash
# 进入刚创建的文件夹
$ cd nestserver

# 添加一个叫admin的子应用服务 它会将原来的src的应用文件都复制到更里面的nestserver中同理再新建一个admin的文件夹来存放新的子应用，旧的应用也可以继续使用
$ nest g app admin
```

### 连接 mongodb 数据库

因为共用数据库，所以需要在最外围的 nestserver 中添加

```bash
# 在最外nestserver文件夹
$ nest g lib db

# 选择创建libs文件夹
# What prefix would you like to use for the library (default: @app)? @libs
```

### 然后连接数据库

先在子应用的 app.module.ts 文件中添加

```ts
import { DbModule } from '@libs/db';

@Module({
  imports: [
    DbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
```

而后还是在最外围的 nestserver 添加插件

```bash
# typegoose更适合ts应用
# nestjs-typegoose 是nest应用使用的 @typegoose/typegoose纯粹ts的封装
$ yarn add nestjs-typegoose @typegoose/typegoose

# 增加mongose工具和对应的ts的类型提示
$ yarn add mongoose @types/mongoose
```

然后在 libs/db 下的 db.module.ts 中引用

```ts
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports:[
    TypegooseModule.forRoot('mongodb://localhost/blog',{
      // useNewUrlParser:true, 其他参数

    })
  ],
  providers: [DbService],
```

## Installation

```bash
# init 分体不用install
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# 分体使使用 -w指可选变量监听文件变化自动重启，admin指我们的子应用叫admin
$ nest start -w admin

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).

## 创建一个模型并引用

在 libs/db/src 下添加一个 models 文件夹保存所有的模型文件
然后添加 user.model.ts,也就是添加用户模型

```ts
import { prop } from '@typegoose/typegoose';

export class User {
  @prop()
  username: string;

  @prop()
  password: string;
}
```

全局引用:在 db.module.ts 中

```ts
import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';

const models = TypegooseModule.forFeature([User])

@Global() // 标记全局引用
@Module({
  imports:[
    TypegooseModule.forRoot('mongodb://localhost/blog',{
      // useNewUrlParser:true, 其他参数

    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
```

创建一个模块

```bash
# -p指选择哪个子应用，此处使用admin应用，创建一个users的模块，它会在admin文件夹下的src下创建一个users文件夹，先添加连接模型文件,添加users.module.ts文件
$ nest g mo -p admin users
# 再创建控制文件 users.controller.ts和users.controller.spec.ts
$ nest g co -p admin users
```

使用插件直接生成 curd

```bash
yarn add nestjs-mongoose-crud
```

### 添加写接口文档的 swagger

```bash
yarn add @nestjs/swagger swagger-ui-express
```

### 使用 yarn 更新包

```sh
yarn phgrade-interactive --latest
```

红色为大跨版本，黄色是中间的版本，绿色是最后面的小版本，一般注意大版本更新

### 使用 nestjs:config 加载环境变量

nest 可以通过.env 文件的增加环境变量

安装

```sh
npm i --save @nestjs/config
#or
yarn add @nestjs/config
```

创建一个公共模块，和 libs 下面的 db 同级

```sh
nest g lib common
```

在 common.module.ts 中 加入

```ts
import { ConfigModule } from '@nestjs/config'; // 注入

@Module({ // 注入
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 使用全局变量声明
    })
  ],
```

创建 .env 文件，并写入相关的变量

复制 .env 文件改名为 .env.example 文件

在 .gitignore 文件中添加忽略 .env 代码

使用和注意， 下面是 db.module.ts 文件中修改的内容，适应，加载 db 使用异步方式

> nestjs 中大部分的方法都有异步的方法，此处注册方式其他地方也可以使用，比如注入密钥的时候也是一样的使用，里面有一个 useFactory 的工厂方法，return 返回所有配置的内容

```ts
@Global() // 标记全局引用
@Module({
  imports: [
    // 为了避免 其他模块同步加载，查找不到mogoodb报错，所以改写成异步
    TypegooseModule.forRootAsync({
      useFactory() {
        return {
          uri: process.env.DB,
          useFindAndModify: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        }
      }
    }),
    // 未使用异步
    // TypegooseModule.forRoot('', {
    //   useFindAndModify: true,
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    // }),
```

同时 使用的模块中 直接用 CommonModule 代替 DbModule

例如 admin 子应用中的 app.module.ts 文件

```ts
const MAO = require('multer-aliyun-oss');

@Module({
  imports: [
    MulterModule.register({
      storage: MAO({
        config: {
          region: 'oss-cn-hangzhou', // 位置 例如 oss-cn-hangzhou
          accessKeyId: 'LTAI4G4rjLiE6sphLTEDJ4ba', // oss 控制台中没有，需要到个人的accessskey中找
          accessKeySecret: 'n7e14KRYrnohTLShw98oOggWdNWBFN',
          bucket: 'yqfts' // 存储空教名称
        }
      })

      // dest: 'uploads' // 会在nestserver 文件夹下创建一个uploads 文件夹，并将文件存入此处，与上面storage相反，二选一即可
    }),
    DbModule,
    UsersModule,

// 改为

const MAO = require('multer-aliyun-oss');

@Module({
  imports: [
    CommonModule,
    MulterModule.register({
      storage: MAO({
        config: {
          region: 'oss-cn-hangzhou', // 位置 例如 oss-cn-hangzhou
          accessKeyId: '***LTAI4***', // oss 控制台中没有，需要到个人的accessskey中找，下面的accesssKeySecret 也是
          accessKeySecret: '***n7e14KRYr***',
          bucket: 'yqfts' // 存储空教名称
        }
      })

      // dest: 'uploads' // 会在nestserver 文件夹下创建一个uploads 文件夹，并将文件存入此处，与上面storage相反，二选一即可
    }),
    UsersModule,

```
