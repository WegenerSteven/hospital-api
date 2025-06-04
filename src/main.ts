import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { AllExceptionFilter } from 'http-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const PORT: number = parseInt(configService.getOrThrow<string>('PORT'), 10);

  const config = new DocumentBuilder()
    .setTitle('hospital API')
    .setDescription('hospital management api')
    .setVersion('1.0')
    .addTag('patients')
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory, {
    jsonDocumentUrl: 'api-json',
  });

  // const { httpAdapter } = app.getHttpAdapter();
  // app.useGlobalFilters(new AllExceptionFilter(httpAdapter));

  await app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Database connected successfully!');
  });
}
bootstrap();
