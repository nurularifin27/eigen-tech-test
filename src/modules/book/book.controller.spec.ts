import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

describe('BookController', () => {
  let bookController: BookController;
  let bookService: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    bookController = module.get<BookController>(BookController);
    bookService = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(bookController).toBeDefined();
  });

  describe('create', () => {
    it('should call bookService.create with the correct parameters', async () => {
      const createBookDto: CreateBookDto = {
        code: 'B001',
        title: 'Test Book',
        author: 'Test Author',
        stock: 10,
      };

      await bookController.create(createBookDto);
      expect(bookService.create).toHaveBeenCalledWith(createBookDto);
    });
  });

  describe('findAll', () => {
    it('should call bookService.findAll', async () => {
      await bookController.findAll();
      expect(bookService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call bookService.findOne with the correct id', async () => {
      const id = '1';
      await bookController.findOne(id);
      expect(bookService.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('update', () => {
    it('should call bookService.update with the correct parameters', async () => {
      const id = '1';
      const updateBookDto: UpdateBookDto = { title: 'Updated Title' };

      await bookController.update(id, updateBookDto);
      expect(bookService.update).toHaveBeenCalledWith(+id, updateBookDto);
    });
  });

  describe('remove', () => {
    it('should call bookService.remove with the correct id', async () => {
      const id = '1';
      await bookController.remove(id);
      expect(bookService.remove).toHaveBeenCalledWith(+id);
    });
  });
});
