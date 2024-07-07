import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RentService } from './rent.service';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('rent')
@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new rent' })
  @ApiResponse({ status: 201, description: 'The rent has been successfully created.' })
  create(@Body() createRentDto: CreateRentDto) {
    return this.rentService.create(createRentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rents' })
  @ApiResponse({ status: 200, description: 'Return all rents.'})
  findAll() {
    return this.rentService.findAll();
  }

  @Patch(':rentCode/return')
  @ApiOperation({ summary: 'Return a rented book by rent code' })
  @ApiResponse({ status: 200, description: 'The rent has been successfully returned.'})
  @ApiResponse({ status: 404, description: 'Rent not found.' })
  update(@Param('rentCode') rentCode: string, @Body() updateRentDto: UpdateRentDto) {
    return this.rentService.returnBook(rentCode,updateRentDto)
  }
}
