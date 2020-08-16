import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const host = 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors() // 允许跨域
  const options = new DocumentBuilder()
    .setTitle('情书人烟里 后台管理API')
    .setDescription('给你的情书人烟里，后台管理程序接口，测试中')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(host);
  console.log(`http://localhost:${host}/api-docs`);
}
bootstrap();
