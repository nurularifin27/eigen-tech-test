import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Member } from './entities/member.entity';

@Injectable()
export class MemberRepository extends Repository<Member> {
    constructor(private dataSource: DataSource) {
        super(Member, dataSource.createEntityManager());
    }
}