import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { TagsModule } from './tags/tags.module';
import { CategoriesModule } from './categories/categories.module';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from '@app/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const MAO = require('multer-aliyun-oss');

@Module({
  imports: [
    CommonModule,
    MulterModule.registerAsync({
      useFactory() {
        return {
          storage: MAO({
            config: {
              region: process.env.OSS_REGION, // 位置 例如 oss-XXX-XXX
              accessKeyId: process.env.OSS_ACCESS_KEY_ID, // oss 控制台中没有，需要到个人的accessskey中找
              accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
              bucket: process.env.OSS_BUCKET // 存储空教名称
            }
          })
        }
      }
    }),
    // 下面是同步注册方式，如果不使用全局变量则使用此方式，否则用上面的异步方式
    // MulterModule.register({
    //   storage: MAO({
    //     config: {
    //       region: 'oss-XXX-XXX', // 位置 例如 oss-XXX-XXX
    //       accessKeyId: '***', // oss 控制台中没有，需要到个人的accessskey中找
    //       accessKeySecret: '*******TLShw98oOggWdNWBFN',
    //       bucket: 'XXX' // 存储空教名称
    //     }
    //   })
    //   // dest: 'uploads' // 会在nestserver 文件夹下创建一个uploads 文件夹，并将文件存入此处，与上面storage相反，二选一即可
    // }),
    UsersModule,
    ArticlesModule,
    TagsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
