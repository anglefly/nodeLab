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
  constructor(@InjectModel(User) private readonly model) { }

  @Get('option')
  option() {
    return {
      index: true,
      indexLabel: "序号",
      page: false,
      dialogDrag: true,
      align: "center",
      // menuAlign: "center",
      column: [
        {
          label: "用户名", prop: "username",
          rules: [{
            required: true,
            trigger: "blur"
          }]
        },
        {
          label: "密码", prop: "password",
          rules: [{
            required: true,
            trigger: "blur"
          }]
        },
      ],
    }
  }
}
