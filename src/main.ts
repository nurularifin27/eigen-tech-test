import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './config/data-source.config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const port = process.env.APP_PORT
  
  try {
    await AppDataSource.initialize();
    logger.log('Data Source has been initialized successfully.');
  } catch (error) {
    logger.error('Error during Data Source initialization', error.stack);
    process.exit(1);
  }

  const app = await NestFactory.create(AppModule);
  
  await app.listen(port, () => {
    logger.log('Application is listening on port '+port);
  });
}
bootstrap();
