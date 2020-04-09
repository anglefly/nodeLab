import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

// 添加创建数据创建时间和更新时间
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @ApiProperty({ description: '用户名', example: 'user1' })
  @prop()
  username: string;

  @ApiProperty({ description: '密码', example: 'pass1' })
  @prop()
  password: string;
}
