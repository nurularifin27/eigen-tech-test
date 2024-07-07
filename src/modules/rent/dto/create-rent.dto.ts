import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNotEmpty, IsString, Validate } from "class-validator";

export class CreateRentDto {
    @ApiProperty({ example: 'M123', description: 'The unique code of the member' })
    @IsNotEmpty()
    @IsString()
    memberCode: string;
  
    @ApiProperty({ example: 'B123', description: 'The unique code of the book' })
    @IsNotEmpty()
    @IsString()
    bookCode: string;
}
