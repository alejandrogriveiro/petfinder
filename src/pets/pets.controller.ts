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
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('pets')
@ApiTags('Pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @Auth()
  @ApiOperation({ summary: 'Creación del la mascota' })
  create(@Body() createPetDto: CreatePetDto, @GetUser() user: User) {
    return this.petsService.create(createPetDto, user);
  }

  @Get()
  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: 'Busqueda de todas las mascotas ' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Mascotas encontradas' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  findAll() {
    return this.petsService.findAll();
  }

  @Get(':term')
  @ApiOperation({ summary: 'Busqueda de la mascota x codigo o por id' })
  @ApiParam({ name: 'term', type: 'string', description: 'Id o Codigo' })
  findOne(@Param('term') term: string) {
    return this.petsService.findOne(term);
  }

  @Get('owner/:ownerId')
  @Auth()
  @ApiOperation({ summary: 'Busqueda de la mascota por dueño' })
  @ApiParam({ name: 'ownerId', type: 'string', description: 'Id del dueño' })
  findByOwner(@Param('ownerId') ownerId: string, @GetUser() user: User) {
    return this.petsService.findByOwner(ownerId, user);
  }

  @Patch(':id')
  @Auth()
  @ApiOperation({ summary: 'Actualización de la mascota' })
  @ApiParam({ name: 'id', type: 'string', description: 'Id de la mascota' })
  update(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
    @GetUser() user: User,
  ) {
    return this.petsService.update(id, updatePetDto, user);
  }

  @Delete(':id')
  @Auth()
  @ApiOperation({ summary: 'Baja de la mascota' })
  @ApiParam({ name: 'id', type: 'string', description: 'Id de la mascota' })
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.petsService.remove(id, user);
  }
}
