import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Article } from '@libs/db/models/article.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';
import { Category } from '@libs/db/models/category.model';
import { Tag } from '@libs/db/models/tag.model';

@Crud({
  model: Article,
})
@Controller('articles')
@ApiTags('文章')
export class ArticlesController {
  constructor(
    @InjectModel(Article)
    private readonly model: ReturnModelType<typeof Article>,

    @InjectModel(Category)
    private readonly categoryModal: ReturnModelType<typeof Category>,

    @InjectModel(Tag)
    private readonly tagModal: ReturnModelType<typeof Tag>,
  ) { };

  @Get('option')
  async option() {
    const categories = (await this.categoryModal.find()).map(v => ({
      label: v.name,
      value: v._id,
    }))
    const tags = (await this.tagModal.find()).map(v => ({
      label: v.name,
      value: v._id,
    }))
    return {
      index: true,
      indexLabel: "序号",
      translate: false, // 解决修改和添加出现 $ 标识的字符串
      copyBtn: true, // 复制功能
      labelWidth: 80, // 弹出表单的label宽度
      // page: false, // 分页
      dialogDrag: true, // 弹窗拖拽
      align: "center", // 表格字体居中
      viewBtn: true, // 查看
      columnBtn: false, // 右上角 列显隐按钮
      menuAlign: "center",
      menuWidth: 250, // 操作栏宽度
      dialogTop: '100px',// 弹窗到顶部高度
      column: [
        {
          label: "标题", prop: "title",
          span: 24,// 总共24份，占满则下一行，也可设置 row:true,来代替独占一行
          sortable: true, // 是否显示排序
          search: true, // 查询框
          regex: true, // 自定义 模糊查询 指令
          rules: [{
            required: true,
            trigger: "blur"
          }]
        },
        {
          label: "内容", prop: "content",
          span: 24,
          type: "textarea",
          showColumn: false, // 列表隐藏
          minRows: 18,
          rules: [{
            required: true,
            trigger: "blur"
          }]
        },
        // {
        //   label: "文件", prop: "file",
        //   type: 'upload',
        //   span: 24,
        //   action: '/api/upload', // 上传地址
        //   showColumn: false, // 列表隐藏
        // },
        {
          label: "封面图", prop: "cover",
          type: 'upload',
          listType: 'picture-img', // 展示类型
          span: 24,
          action: '/api/upload', // 上传地址
          width: 120,
        },
        {
          label: "作者",
          prop: "author",
          search: true, // 查询框
          sortable: true,
          regex: true, // 自定义 模糊查询 指令
          value: "JohnChrisWu", // 默认值
          rules: [{
            required: true,
            trigger: "blur"
          }]
        },
        {
          label: "关键字",
          prop: "keyword",
          span: 24,
          sortable: true,
          search: true, // 查询框
          regex: true, // 自定义 模糊查询 指令
        },
        {
          label: "分类",
          prop: "category",
          type: 'select',
          span: 24,
          sortable: true,
          search: true, // 查询框
          dicData: categories,
          value: '前端开发'
          // value: ['']
          // formatter: (row, value, label, column) => {
          //   console.log(row, value, label, column);
          //   return {
          //     row, value, label, column
          //   }
          // }
        },
        {
          label: "标签",
          prop: "tag",
          type: 'select',
          // multiple: true,//多选
          span: 24,
          sortable: true,
          search: true, // 查询框
          dicData: tags,
        },
        {
          label: "类型",
          prop: "type",
          type: "radio",
          sortable: true,
          search: true, // 查询框
          value: 1, // 默认值
          dicData: [
            {
              label: "普通文章",
              value: 1,
            },
            {
              label: "简历",
              value: 2,
            },
            {
              label: "管理员介绍",
              value: 3,
            },
          ],
          rules: [{
            required: true,
            trigger: "change"
          }]
        },
        {
          label: "转载状态",
          prop: "origin",
          sortable: true,
          search: true, // 查询框
          type: "radio",
          value: 1, // 默认值
          dicData: [
            {
              label: "原创",
              value: 1,
            },
            {
              label: "转载",
              value: 2,
            },
            {
              label: "混合",
              value: 3,
            },
          ],
        },
      ],
    }
  }
};