import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateQrcodeDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  code: string;
}
