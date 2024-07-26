import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @Auth()
  create(@Body() createPetDto: CreatePetDto, @GetUser() user: User) {
    return this.petsService.create(createPetDto, user);
  }

  @Get()
  @Auth(ValidRoles.admin)
  findAll() {
    return this.petsService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.petsService.findOne(term);
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
    @GetUser() user: User,
  ) {
    return this.petsService.update(id, updatePetDto, user);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.petsService.remove(id, user);
  }
}
