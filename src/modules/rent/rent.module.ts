import { Module } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentController } from './rent.controller';
import { MemberService } from '../member/member.service';
import { BookService } from '../book/book.service';
import { Rent } from './entities/rent.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentRepository } from './rent.repository';
import { MemberRepository } from '../member/member.repository';
import { BookRepository } from '../book/book.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([Rent])
  ],
  controllers: [RentController],
  providers: [RentService,MemberService,BookService, RentRepository, MemberRepository, BookRepository],
})
export class RentModule {}
