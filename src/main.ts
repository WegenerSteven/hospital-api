import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
// import { AllExceptionFilter } from 'http-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const PORT: number = parseInt(configService.getOrThrow<string>('PORT'), 10);

  // const { httpAdapter } = app.getHttpAdapter();
  // app.useGlobalFilters(new AllExceptionFilter(httpAdapter));

  await app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Database connected successfully!');
  });
}
bootstrap();
