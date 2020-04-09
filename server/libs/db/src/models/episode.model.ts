// 单个 文件 模型
import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

// 添加创建数据创建时间和更新时间
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Episode {
  @ApiProperty({ description: '课程名|文件名', example: 'xxx教程' })
  @prop()
  name: string;

  @prop()
  file: string;
}
