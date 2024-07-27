import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    enum: ['user@gmail.com', 'admin@gmail.com', 'usuario@gmail.com'],
    description: 'Email del usuario',
    required: true,
  })
  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'Ingrese un email valido' })
  email: string;

  @ApiProperty({
    example: 'Abc123',
    description: 'Contraseña del usuario',
    required: true,
    minLength: 6,
  })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string;
}
