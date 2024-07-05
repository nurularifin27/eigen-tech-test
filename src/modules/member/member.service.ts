import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberRepository } from './member.repository';
import { Member } from './entities/member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { QueryFailedError } from 'typeorm';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MemberService {
    constructor(
        @InjectRepository(MemberRepository)
        private readonly bookRepository: MemberRepository,
    ) {}

    async create(createMemberDto: CreateMemberDto): Promise<Member> {
        try {
            const book = this.bookRepository.create(createMemberDto);
            return await this.bookRepository.save(book);
        } catch (error) {
            if (error instanceof QueryFailedError) {
                if (error.message.includes('duplicate key value violates unique constraint')) {
                    throw new ConflictException('Member with this code already exists');
                } else {
                    throw new InternalServerErrorException('Database error occurred', error.message);
                }
            } else {
                throw new InternalServerErrorException('Failed to create book', error.message);
            }
        }
    }

    async findAll(): Promise<Member[]> {
        return await this.bookRepository.find();
    }

    async findOne(id: number): Promise<Member> {
        const book = await this.bookRepository.findOneBy({ id });
        if (!book) {
            throw new NotFoundException(`Member with ID ${id} not found`);
        }
        return book;
    }

    async update(id: number, updateMemberDto: UpdateMemberDto): Promise<Member> {
        await this.bookRepository.update(id, updateMemberDto);
        const updatedMember = await this.bookRepository.findOneBy({ id });
        if (!updatedMember) {
            throw new NotFoundException(`Member with ID ${id} not found`);
        }
        return updatedMember;
    }

    async remove(id: number): Promise<void> {
        const result = await this.bookRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Member with ID ${id} not found`);
        }
    }
}