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

  @ApiProperty({ description: '作者', example: 'johnwu', required: true })
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

  @ApiProperty({ description: '发布状态: 0 草稿，1 已发布', default: 0 })
  @prop()
  state: number;

  @ApiProperty({ description: '转载状态: 0 原创，1 转载，2 混合', default: 0 })
  @prop()
  origin: number;

  @ApiProperty({ description: '标签' })
  @arrayProp({ items: Tag })
  tags: Ref<Tag>[];

  @ApiProperty({ description: '分类' })
  @arrayProp({ items: Category })
  categories: Ref<Category>[];
}
