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
export class DbModule {}
