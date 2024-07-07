import { PartialType } from '@nestjs/mapped-types';
import { CreateRentDto } from './create-rent.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRentDto extends PartialType(CreateRentDto) {
    @ApiProperty({ example: 'B123', description: 'The unique code of the book' })
    @IsNotEmpty()
    @IsString()
    bookCode?: string;
}
