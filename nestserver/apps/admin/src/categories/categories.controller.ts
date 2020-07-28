import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';
import { Category } from '@libs/db/models/category.model';

@Crud({
  model: Category,
})
@Controller('categories')
@ApiTags('分类')
export class CategoriesController {
  constructor(
    @InjectModel(Category)
    private readonly model: ReturnModelType<typeof Category>,
  ) {}
}
