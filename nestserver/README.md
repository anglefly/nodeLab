
# Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Preparatory work

```bash
# install
$ npm i -g @nestjs/cli

# create project
$ nest new project-name
```

### 选用分体模式，admin对接内部服务，nestserver是对接普通服务

```bash
# 进入刚创建的文件夹
$ cd nestserver

# 添加一个叫admin的子应用服务 它会将原来的src的应用文件都复制到更里面的nestserver中同理再新建一个admin的文件夹来存放新的子应用，旧的应用也可以继续使用
$ nest g app admin
```

### 连接mongodb数据库

因为共用数据库，所以需要在最外围的nestserver中添加

```bash
# 在最外nestserver文件夹
$ nest g lib db

# 选择创建libs文件夹
# What prefix would you like to use for the library (default: @app)? @libs
```

### 然后连接数据库

先在子应用的app.module.ts文件中添加

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

而后还是在最外围的nestserver添加插件

```bash
# typegoose更适合ts应用
# nestjs-typegoose 是nest应用使用的 @typegoose/typegoose纯粹ts的封装
$ yarn add nestjs-typegoose @typegoose/typegoose

# 增加mongose工具和对应的ts的类型提示
$ yarn add mongoose @types/mongoose
```

然后在libs/db下的db.module.ts中引用

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

在libs/db/src下添加一个models文件夹保存所有的模型文件
然后添加user.model.ts,也就是添加用户模型

```ts
import { prop } from '@typegoose/typegoose';

export class User {
  @prop()
  username: string;

  @prop()
  password: string;
}

```

全局引用:在db.module.ts中

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

使用插件直接生成curd

```bash
yarn add nestjs-mongoose-crud
```

### 添加写接口文档的swagger

```bash
yarn add @nestjs/swagger swagger-ui-express
```
