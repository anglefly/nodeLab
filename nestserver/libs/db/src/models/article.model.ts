import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Tag } from './tag.model';
import { Category } from './category.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Article {
  @ApiProperty({
    description: '文章标题',
    example: '这是一个标题',
    // readOnly: true,
    required: true,
  })
  @prop()
  title: string;

  @ApiProperty({ description: '关键字：用于seo', example: 'web前端' })
  @prop()
  keyword: string;

  @ApiProperty({ description: '作者', example: 'johnwu' })
  @prop()
  author: string;

  @ApiProperty({ description: '内容', example: '测试内容', required: true })
  @prop()
  content: string;

  @ApiProperty({ description: '封面图地址' })
  @prop()
  cover: string;

  @ApiProperty({
    description: '类型: 1: 普通文章，2: 简历，3: 管理员介绍',
    default: 1,
  })
  @prop()
  type: number;

  @ApiProperty({ description: '发布状态: 1 草稿，2 已发布', default: 1 })
  @prop()
  state: number;

  @ApiProperty({ description: '转载状态: 1 原创，2 转载，3 混合', default: 1 })
  @prop()
  origin: number;

  @ApiProperty({ description: '标签' })
  @prop({ ref: Tag })
  tag: Ref<Tag>;

  // @ApiProperty({ description: '标签' }) // 多选
  // @arrayProp({ itemsRef: Tag })
  // tags: Ref<Tag>[];

  @ApiProperty({ description: '分类' })
  @prop({ ref: Category })
  category: Ref<Category>;
}
