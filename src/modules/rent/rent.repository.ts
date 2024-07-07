import { Injectable } from '@nestjs/common';
import { Repository, DataSource, Not } from 'typeorm';
import { Rent } from './entities/rent.entity';

@Injectable()
export class RentRepository extends Repository<Rent> {
    constructor(private dataSource: DataSource) {
        super(Rent, dataSource.createEntityManager());
    }

    async countBorrowedByMemberId(memberId: number): Promise<number> {
        return this.count({
          where: {
            member: { id: memberId },
            status: 'borrowed',
          },
        });
    }

    async findOneLateReturnRentByMemberId(memberId: number): Promise<Rent> {
        return this.findOne({
          where: {
            isLate: true,
            status: 'returned',
          },
        });
    }

    async findOneRentForCheckBookBorrowedByOtherMember(bookId: number, memberId: number): Promise<Rent> {
        return this.findOne({
          where: {
            book: { id: bookId },
            member: { id: Not(memberId) },
            status: 'borrowed',
          },
        });
    }
}