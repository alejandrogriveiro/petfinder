import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { isUUID } from 'class-validator';
import { QrcodeService } from '../qrcode/qrcode.service';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petRepository: Repository<Pet>,
    private qrcodeService: QrcodeService,
  ) {}

  async create(createPetDto: CreatePetDto, user: User) {
    try {
      const { code } = createPetDto;

      await this.qrcodeService.findOne(code);

      const existingPet = await this.petRepository.findOneBy({ code });

      if (existingPet) {
        throw new ConflictException('El QR ya fue utilizado');
      }

      const newPet = this.petRepository.create({
        ...createPetDto,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
      });

      const savedPet = await this.petRepository.save(newPet);

      return {
        ...savedPet,
        user,
      };
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Pet[]> {
    return this.petRepository
      .createQueryBuilder('pet')
      .leftJoinAndSelect('pet.user', 'user')
      .select([
        'pet.id',
        'pet.name',
        'pet.code',
        'pet.status',
        'pet.picture',
        'pet.bio',
        'pet.isActive',
        'user.id',
        'user.email',
        'user.firstName',
        'user.lastName',
        'user.phone',
      ])
      .getMany();
  }

  async findOne(term: string): Promise<Pet> {
    let pet: Pet;

    if (isUUID(term)) {
      pet = await this.petRepository
        .createQueryBuilder('pet')
        .leftJoinAndSelect('pet.user', 'user')
        .select([
          'pet.id',
          'pet.name',
          'pet.code',
          'pet.status',
          'pet.picture',
          'pet.bio',
          'pet.isActive',
          'user.id',
          'user.email',
          'user.firstName',
          'user.lastName',
          'user.phone',
        ])
        .where('pet.id = :id', { id: term })
        .getOne();
    } else {
      pet = await this.petRepository
        .createQueryBuilder('pet')
        .leftJoinAndSelect('pet.user', 'user')
        .select([
          'pet.id',
          'pet.name',
          'pet.code',
          'pet.status',
          'pet.picture',
          'pet.bio',
          'pet.isActive',
          'user.id',
          'user.email',
          'user.firstName',
          'user.lastName',
          'user.phone',
        ])
        .where('pet.code = :code', { code: term.toUpperCase() })
        .getOne();
    }

    if (!pet) {
      throw new NotFoundException(`Pet with ${term.toUpperCase()} not found`);
    }

    return pet;
  }

  findByOwner(ownerId: string, user: User) {
    return this.petRepository
      .createQueryBuilder('pet')
      .leftJoinAndSelect('pet.user', 'user')
      .where('pet.user = :ownerId', { ownerId })
      .andWhere('user.id = :userId', { userId: user.id })
      .select([
        'pet.id',
        'pet.name',
        'pet.code',
        'pet.status',
        'pet.picture',
        'pet.bio',
        'pet.isActive',
        'user.id',
        // 'user.email',
        // 'user.firstName',
        // 'user.lastName',
        // 'user.phone',
      ])
      .getMany();
  }

  async update(id: string, updatePetDto: UpdatePetDto, user: User) {
    const pet = await this.findOne(id);
    if (pet.user.id !== user.id)
      throw new ForbiddenException('You are not allowed to update this pet');

    const updatedPet = this.petRepository.create({
      ...pet,
      ...updatePetDto,
      user,
    });
    await this.petRepository.save(updatedPet);

    return updatedPet;
  }

  async remove(id: string, user: User) {
    const pet = await this.findOne(id);
    if (pet.user.id !== user.id)
      throw new ForbiddenException('You are not allowed to delete this pet');

    await this.petRepository.remove(pet);
    return {
      message: 'Pet deleted successfully',
      deleted: true,
      pet,
    };
  }
}
