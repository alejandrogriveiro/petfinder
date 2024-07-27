import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'usuarior@gmail.com',
    description: 'Email del usuario',
    required: true,
  })
  @IsNotEmpty({ message: 'El Email es requerido.' })
  @IsEmail({}, { message: 'El Email no es valido.' })
  email: string;

  @ApiProperty({
    example: 'Abc123',
    description:
      'La password tiene que tener al menos una mayuscula, una minuscula y un número',
    required: true,
    minLength: 6,
  })
  @IsNotEmpty({ message: 'La Password es requerida.' })
  @IsString()
  @MinLength(6, {
    message: 'La password tiene que tener al menos 6 caracteres',
  })
  @MaxLength(50)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w+$/, {
    message:
      'La password tiene que tener al menos una mayuscula, una minuscula y un número',
  })
  password: string;

  @ApiProperty({
    example: 'Juan',
    description: 'El nombre tiene que tener menos de 100 caracteres',
    required: true,
  })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString()
  @MaxLength(100, {
    message: 'El nombre tiene que tener menos de 100 caracteres',
  })
  firstName: string;

  @ApiProperty({
    example: 'Perez',
    description: 'El apellido tiene que tener menos de 100 caracteres',
    required: true,
  })
  @IsNotEmpty({ message: 'El apellido es requerido' })
  @IsString()
  @MaxLength(100, {
    message: 'El apellido tiene que tener menos de 100 caracteres',
  })
  lastName: string;

  @ApiProperty({
    example: '1234567890',
    description: 'El phone tiene que tener 10 caracteres',
    required: true,
    minLength: 10,
  })
  @IsNotEmpty({ message: 'El phone es requerido' })
  @IsString()
  phone: string;

  @ApiPropertyOptional({
    example: 'https://facebook.com',
    description: 'La url de  tu facebook',
    required: false,
  })
  @IsString()
  @IsOptional()
  facebook?: string;

  @ApiPropertyOptional({
    example: 'https://instagram.com',
    description: 'La url de  tu instagram',
    required: false,
  })
  @IsString()
  @IsOptional()
  instagram?: string;

  @ApiPropertyOptional({
    example: 'https://twitter.com',
    description: 'La url de  tu twitter',
    required: false,
  })
  @IsString()
  @IsOptional()
  twitter?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Si el usuario es activo o no',
    default: true,
  })
  @IsOptional()
  isActive?: boolean;
}
