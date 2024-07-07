import { IsDate, IsInt, IsNotEmpty, IsString, Validate } from "class-validator";

export class CreateRentDto {
    @IsNotEmpty()
    @IsString()
    memberCode: string;
  
    @IsNotEmpty()
    @IsString()
    bookCode: string;
}
