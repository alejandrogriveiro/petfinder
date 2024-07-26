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
  @IsNotEmpty({ message: 'El Email es requerido.' })
  @IsEmail({}, { message: 'El Email no es valido.' })
  email: string;

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

  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString()
  @MaxLength(100, {
    message: 'El nombre tiene que tener menos de 100 caracteres',
  })
  firstName: string;

  @IsNotEmpty({ message: 'El apellido es requerido' })
  @IsString()
  @MaxLength(100, {
    message: 'El apellido tiene que tener menos de 100 caracteres',
  })
  lastName: string;

  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  facebook?: string;

  @IsString()
  @IsOptional()
  instagram?: string;

  @IsString()
  @IsOptional()
  twitter?: string;

  @IsOptional()
  isActive?: boolean;
}
