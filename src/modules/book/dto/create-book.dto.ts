import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    code: string;
    
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()    
    @IsString()
    author: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    stock: number;
}
