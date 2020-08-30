/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 下面可以写自定义的一些接口
  // 自定义一个路由为/upload的post接口
  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // 使用拦截器 拦截文件流
  async upload(@UploadedFile('file') file) {

    return file // 使用阿里云

    // return {
    //   url: `http://localhost:3000/uploads/${file.filename}`
    // }
  }
}
