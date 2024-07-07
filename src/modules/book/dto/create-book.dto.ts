import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateBookDto {
    @ApiProperty({ example: '123', description: 'The unique code of the book' })
    @IsNotEmpty()
    @IsString()
    code: string;
    
    @ApiProperty({ example: 'Test Book', description: 'The title of the book' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ example: 'Author', description: 'The author of the book' })
    @IsNotEmpty()    
    @IsString()
    author: string;

    @ApiProperty({ example: 10, description: 'The stock of the book' })
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    stock: number;
}
