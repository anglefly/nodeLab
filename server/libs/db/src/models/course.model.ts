import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Episode} from './episode.model'

// 添加创建数据创建时间和更新时间
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Course {
  @ApiProperty({ description: '课程名称', example: '课程1' })
  @prop()
  name: string;

  @ApiProperty({ description: '封面图' })
  @prop()
  cover: string;

  // 引用数据/关联
  @arrayProp({itemsRef:'Episode'})
  episodes: Ref<Episode>
}
