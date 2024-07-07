import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './config/data-source.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';

async function bootstrap() {
  const logger = new Logger(AppModule.name);
  const port = process.env.APP_PORT
  
  try {
    await AppDataSource.initialize();
    logger.log('Data Source has been initialized successfully.');
  } catch (error) {
    logger.error('Error during Data Source initialization', error.stack);
    process.exit(1);
  }

  const app = await NestFactory.create(AppModule);
  
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () => {
    logger.log('Application is listening on port '+port);
  });
}
bootstrap();
