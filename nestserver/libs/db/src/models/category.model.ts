import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Category {
  @ApiProperty({
    description: '分类名称',
    example: '前端开发',
    required: true,
  })
  @prop()
  name: string;

  @ApiProperty({ description: '描述', example: '专门装载前端开发内容，前端技术、面试题、前沿技术……' })
  @prop()
  desc: string;

  @ApiProperty({ description: '图标', example: 'seccess' })
  @prop()
  icon: string;
}
