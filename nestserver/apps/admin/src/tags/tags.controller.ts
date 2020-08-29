import { Controller, Get } from '@nestjs/common';
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
  constructor(@InjectModel(Tag) private readonly model) { }

  @Get('option')
  option() {
    return {
      index: true,
      indexLabel: "序号",
      page: false,
      dialogDrag: true,
      align: "center",
      menuAlign: "center",
      column: [
        {
          label: "名称", prop: "name", span: 24,
          rules: [{
            required: true,
            trigger: "blur"
          }]
        },
        {
          label: "描述", prop: "desc",
          span: 24,
          type: "textarea",
          minRows: 3,
        },
        {
          label: "图标", prop: "icon",
        },
      ],
    }
  }
}