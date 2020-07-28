import { prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

// @modelOptions({
//   schemaOptions: {
//     timestamps: true,
//   },
// })
export class Tag {
  @ApiProperty({
    description: '标签名称',
    example: 'typescript',
    required: true,
  })
  @prop()
  name: string;

  @ApiProperty({ description: '描述', example: 'js的拓展' })
  @prop()
  desc: string;

  @ApiProperty({ description: '图标', example: 'success' })
  @prop()
  icon: string;
}
