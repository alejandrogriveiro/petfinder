import { PartialType } from '@nestjs/swagger';
import { CreatePetDto } from './create-pet.dto';
import { Exclude } from 'class-transformer';

export class UpdatePetDto extends PartialType(CreatePetDto) {
  @Exclude()
  code?: string;
}
