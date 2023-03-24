import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config: any = new DocumentBuilder()
  config.setTitle('Walkthrough website')
  config.setDescription('A website which can share your walkthrough.')
  config.setVersion('1.0')
  config.addTag('walkthrough')
  config.build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000);
}
bootstrap();
// the entry point to the application
