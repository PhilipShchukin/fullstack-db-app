import { IsInt, IsString } from 'class-validator';

export class MessageDto {

    @IsString()
    content: string; 
    
    @IsInt()
    databaseId: number 
}