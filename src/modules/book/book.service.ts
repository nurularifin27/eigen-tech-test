import { Injectable, NotFoundException, ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { BookRepository } from './book.repository';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
    private logger = new Logger(BookService.name);
    constructor(
        @InjectRepository(BookRepository)
        private readonly bookRepository: BookRepository,
    ) {}

    async create(createBookDto: CreateBookDto): Promise<Book> {
        try {
            const book = this.bookRepository.create(createBookDto);
            return await this.bookRepository.save(book);
        } catch (error) {
            this.logger.error(error)
            if (error instanceof QueryFailedError) {
                if (error.message.includes('duplicate key value violates unique constraint')) {
                    throw new ConflictException('Book with this code already exists');
                } else {
                    throw new InternalServerErrorException('Database error occurred', error.message);
                }
            } else {
                throw new InternalServerErrorException('Failed to create book', error.message);
            }
        }
    }

    async findAll(): Promise<Book[]> {
        return await this.bookRepository.find();
    }

    async findOne(id: number): Promise<Book> {
        const book = await this.bookRepository.findOneBy({ id });
        if (!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
        return book;
    }

    async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
        await this.bookRepository.update(id, updateBookDto);
        const updatedBook = await this.bookRepository.findOneBy({ id });
        if (!updatedBook) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
        return updatedBook;
    }

    async remove(id: number): Promise<void> {
        const result = await this.bookRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
    }
}
