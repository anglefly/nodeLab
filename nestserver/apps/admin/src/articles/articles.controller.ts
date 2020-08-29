import { Controller, Get } from '@nestjs/common';
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
  ) { };

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
          label: "标题", prop: "title", span: 24,
          rules: [{
            required: true,
            trigger: "blur"
          }]
        },
        {
          label: "内容", prop: "content",
          span: 24,
          type: "textarea",
          minRows: 8,
          rules: [{
            required: true,
            trigger: "blur"
          }]
        },
        {
          label: "封面图", prop: "cover",
        },
        {
          label: "作者", prop: "author", rules: [{
            required: true,
            trigger: "blur"
          }]
        },
        {
          label: "关键字", prop: "keyword", span: 24,
        },
        {
          label: "类型",
          prop: "type",
          type: "radio",
          dicData: [
            {
              label: "普通文章",
              value: 1,
            },
            {
              label: "简历",
              value: 2,
            },
            {
              label: "管理员介绍",
              value: 3,
            },
          ],
          rules: [{
            required: true,
            trigger: "change"
          }]
        },
        {
          label: "转载状态",
          prop: "origin",
          type: "radio",
          dicData: [
            {
              label: "原创",
              value: 1,
            },
            {
              label: "转载",
              value: 2,
            },
            {
              label: "混合",
              value: 3,
            },
          ],
        },
      ],
    }
  }
};