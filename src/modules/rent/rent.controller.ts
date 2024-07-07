import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RentService } from './rent.service';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';

@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Post()
  create(@Body() createRentDto: CreateRentDto) {
    return this.rentService.create(createRentDto);
  }

  @Get()
  findAll() {
    return this.rentService.findAll();
  }

  @Patch(':rentCode/return')
  update(@Param('rentCode') rentCode: string, @Body() updateRentDto: UpdateRentDto) {
    return this.rentService.returnBook(rentCode,updateRentDto)
  }
}
