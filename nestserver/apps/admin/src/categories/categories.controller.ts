import { Controller, Get } from '@nestjs/common';
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
  ) { }

  @Get('option')
  option() {
    return {
      index: true,
      indexLabel: "序号",
      // page: false,
      dialogDrag: true,
      align: "center",
      menuAlign: "center",
      column: [
        {
          label: "名称", prop: "name", span: 24,
          sortable: true,
          search: true, // 查询框
          regex: true, // 自定义 模糊查询 指令
          rules: [{
            required: true,
            trigger: "blur"
          }]
        },
        {
          label: "描述", prop: "desc",
          sortable: true,
          search: true, // 查询框
          regex: true, // 自定义 模糊查询 指令
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
