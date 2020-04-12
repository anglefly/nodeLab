import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: User,
})
@Controller('users')
@ApiTags('用户')
export class UsersController {
  constructor(@InjectModel(User) private readonly model) {}
  @Get('options')
  options() {
    return {
      title: '用户管理',
      refreshBtn: false,
      columnBtn: false,
      column: [
        { prop: 'username', label: '用户名' },
        { prop: 'password', label: '密码' },
      ],
    };
  }
}
