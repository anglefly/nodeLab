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
    TypegooseModule.forRoot('mongodb://localhost/blog', {
      // useNewUrlParser:true, 其他参数
      useFindAndModify: true,
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
