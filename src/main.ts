import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './config/data-source.config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
    .setTitle('Rent Book API')
    .setDescription('API documentation for the Rent Book service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);
  
  await app.listen(port, () => {
    logger.log('Application is listening on port '+port);
  });
}
bootstrap();
