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
      // page: false,
      dialogDrag: true,
      align: "center",
      // menuAlign: "center",
      column: [
        {
          label: "用户名", prop: "username",
          sortable: true,
          search: true, // 查询框
          regex: true, // 自定义 模糊查询 指令
          rules: [{
            required: true,
            trigger: "blur"
          }]
        },
        {
          label: "密码", prop: "password",
          showColumn: false, // 列表隐藏
          regex: true, // 自定义 模糊查询 指令
          rules: [{
            required: true,
            trigger: "blur"
          }]
        },
      ],
    }
  }
}
