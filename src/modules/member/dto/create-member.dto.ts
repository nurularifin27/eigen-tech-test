import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateMemberDto {
    @ApiProperty({ example: 'M123', description: 'The unique code of the member' })
    @IsNotEmpty()
    @IsString()
    code: string;
    
    @ApiProperty({ example: 'Member 1', description: 'The name of the member' })
    @IsNotEmpty()
    @IsString()
    name: string;
}
