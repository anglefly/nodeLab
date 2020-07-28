import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags } from '@nestjs/swagger';
import { Tag } from '@libs/db/models/tag.model';

@Crud({
  model: Tag,
})
@Controller('tags')
@ApiTags('标签')
export class TagsController {
  constructor(@InjectModel(Tag) private readonly model) {}
}