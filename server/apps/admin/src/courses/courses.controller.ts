import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Course } from '@libs/db/models/course.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: Course,
})
@Controller('courses')
@ApiTags('课程|文件组')
export class CoursesController {
  constructor(
    @InjectModel(Course) private readonly model: ReturnModelType<typeof Course>,
  ) {}

  @Get('options')
  options() {
    return {
      title: '课程|文件夹管理',
      refreshBtn: true, // 刷新
      columnBtn: false, // 控制显示列
      column: [
        // sortable 增加排序 search查询框
        {
          prop: 'name',
          label: '课程名称',
          sortable: true,
          search: true,
          regx: true,
          // span:8,// 有24等分，取8分
          row: true, // 独占一行
        },
        {
          prop: 'cover',
          type: 'upload', // 上传组件
          listType: 'picture-img',
          action: 'upload',
          // accept:'.png',
          width: 100,
          label: '封面图',
          row: true,
        },
      ],
    };
  }
}
