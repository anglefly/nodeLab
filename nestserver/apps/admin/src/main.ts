import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // 由于nest 底层同时支持 express 和fastify,所以需要在create指定使用的基础框架
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors() // 允许跨域
  // app.useStaticAssets('uploads', { // 本地托管文件，如果使用云则忽略
  //   prefix: '/uploads'
  // })
  const options = new DocumentBuilder()
    .setTitle('情书人烟里 后台管理API')
    .setDescription('给你的情书人烟里，后台管理程序接口，测试中')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  const PORT = process.env.ADMIN_PORT || 3002
  await app.listen(PORT);
  console.log(`http://localhost:${PORT}/api-docs`);
}
bootstrap();
