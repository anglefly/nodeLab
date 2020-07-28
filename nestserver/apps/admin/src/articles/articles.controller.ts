import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Article } from '@libs/db/models/article.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: Article,
})
@Controller('articles')
@ApiTags('文章')
export class ArticlesController {
  constructor(
    @InjectModel(Article)
    private readonly model: ReturnModelType<typeof Article>,
  ) {}
}
