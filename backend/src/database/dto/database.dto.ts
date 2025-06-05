import { IsInt, Min } from 'class-validator';

export class DatabaseDto {
  @IsInt()
  @Min(1)
  capacity: number;
}