import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './modules/book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './config/data-source.config';
import { MemberModule } from './modules/member/member.module';
import { RentModule } from './modules/rent/rent.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    BookModule,
    MemberModule,
    RentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
