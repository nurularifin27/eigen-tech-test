import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { Rent } from './entities/rent.entity';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RentRepository } from './rent.repository';
import { MemberRepository } from '../member/member.repository';
import { BookRepository } from '../book/book.repository';
import { generateRentCode } from 'src/utils/code-generator.util';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(RentRepository)
    private readonly rentRepository: RentRepository,
    @InjectRepository(MemberRepository)
    private readonly memberRepository: MemberRepository,
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
  ) {}
  
  async create(createRentDto: CreateRentDto): Promise<Rent> {
    const { memberCode, bookCode } = createRentDto;
    
    const member = await this.findMemberByCode(memberCode);
    const book = await this.findBookByCode(bookCode);

    await this.checkMemberEligibility(member);

    await this.checkBookAvailability(book, member);
    
    const rent = new Rent();
    rent.code = generateRentCode(memberCode)
    rent.member = member;
    rent.book = book;
    rent.rentDate = new Date();
    
    return await this.rentRepository.save(rent);
  }
  
  async findAll(): Promise<Rent[]> {
    return await this.rentRepository.find();
  }

  async returnBook(rentCode: string, updateRentDto: UpdateRentDto): Promise<Rent> {
    const rent = await this.rentRepository.findOneBy({ code: rentCode });
    if (!rent) {
      throw new NotFoundException(`Rent with code ${rentCode} not found`);
    }

    if (rent.book.code != updateRentDto.bookCode) {
      throw new NotFoundException(`Book with code ${updateRentDto.bookCode} not found in the rent`);
    }

    const today = new Date();
    const maxReturnDays = +process.env.MAX_RETURN_DAYS;
    rent.returnDate = today;
    
    const rentDate = new Date(rent.rentDate);
    const differenceInDays = Math.floor((today.getTime() - rentDate.getTime()) / (1000 * 60 * 60 * 24));

    rent.status = 'returned';
    rent.isLate = differenceInDays > maxReturnDays;

    return await this.rentRepository.save(rent);
  }

  private async findMemberByCode(memberCode: string) {
    const member = await this.memberRepository.findOneBy({ code: memberCode });
    if (!member) {
      throw new NotFoundException(`Member with code ${memberCode} not found`);
    }
    return member;
  }

  private async findBookByCode(bookCode: string) {
    const book = await this.bookRepository.findOneBy({ code: bookCode });
    if (!book) {
      throw new NotFoundException(`Book with code ${bookCode} not found`);
    }
    return book;
  }

  private async checkMemberEligibility(member: any) {
    const memberLateReturnRent = await this.rentRepository.findOneLateReturnRentByMemberId(member.id);
    if (memberLateReturnRent) {
      const maxPenalizedDay = +process.env.MAX_PENALIZED_DAYS;
      const currentDate = new Date();
      const daysDifference = (currentDate.getTime() - memberLateReturnRent.returnDate.getTime()) / (1000 * 3600 * 24);

      if (daysDifference < maxPenalizedDay) {
        throw new BadRequestException(`Member with code ${member.code} has an outstanding late return penalty`);
      }
    }

    const countBookBorrowed = await this.rentRepository.countBorrowedByMemberId(member.id);
    const maxBorrowedBooks = +process.env.MAX_BORROWED_BOOKS;
    if (countBookBorrowed >= maxBorrowedBooks) {
      throw new BadRequestException(`Member with code ${member.code} has already borrowed the maximum number of books`);
    }
  }

  private async checkBookAvailability(book: any, member: any) {
    const rentByOther = await this.rentRepository.findOneRentForCheckBookBorrowedByOtherMember(book.id, member.id);
    if (rentByOther) {
      throw new BadRequestException(`Book with code ${book.code} is already borrowed by another member`);
    }
  }
}
