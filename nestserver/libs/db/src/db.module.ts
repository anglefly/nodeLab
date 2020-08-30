import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';
import { Tag } from './models/tag.model';
import { Article } from './models/article.model';
import { Category } from './models/category.model';

const models = TypegooseModule.forFeature([User, Tag, Article, Category]);

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
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule { }
