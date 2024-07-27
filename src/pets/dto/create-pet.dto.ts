import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePetDto {
  @ApiProperty({
    example: 'Firulais',
    description: 'El nombre del mascota',
    required: true,
  })
  @IsNotEmpty({ message: 'El Nombre es requerido' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'AZBJXUNO',
    description: 'El Codigo del mascota dado en el qr',
    required: true,
  })
  @IsNotEmpty({ message: 'El código es requerido' })
  @IsString()
  code: string;

  @ApiPropertyOptional({
    example: 'Perdido',
    description: 'El estado de la mascota',
    required: false,
  })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({
    example: 'https://google.com',
    description: 'La imagen de la mascota',
    required: false,
  })
  @IsString()
  @IsOptional()
  picture?: string;

  @ApiPropertyOptional({
    example: 'Enfermedades que padece la mascota',
    description: 'La biografia de la mascota',
    required: false,
  })
  @IsString()
  @IsOptional()
  bio?: string;
}
