import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePetDto {
  @IsNotEmpty({ message: 'El Nombre es requerido' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'El código es requerido' })
  @IsString()
  code: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  picture?: string;

  @IsString()
  @IsOptional()
  bio?: string;
}
