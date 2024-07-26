import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';

import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll() {
    // return this.userRepository.find({
    //   relations: ['pets'],
    // });
    const users = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.pets', 'pets')
      .select([
        'user.id',
        'user.email',
        'user.firstName',
        'user.lastName',
        // Add other user fields you want to select
        'pets.id',
        'pets.name',
        'pets.code',
        'pets.status',
        'pets.picture',
        'pets.bio',
        'pets.is_active',

        // Add other pet fields you want to select
      ])
      .getMany();

    return users;
  }

  async findOne(id: string) {
    // const user = await this.userRepository.findOne({
    //   where: { id },
    //   relations: ['pets'], // Include other relations if needed
    // });

    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.pets', 'pets')
      .select([
        'user.id',
        'user.email',
        'user.firstName',
        'user.lastName',
        // Add other user fields you want to select
        'pets.id',
        'pets.name',
        'pets.code',
        'pets.status',
        'pets.picture',
        'pets.bio',
        'pets.is_active',

        // Add other pet fields you want to select
      ])
      .where('user.id = :id', { id })
      .getOne();

    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    const updatedUser = this.userRepository.create({
      ...user,
      ...updateUserDto,
    });
    await this.userRepository.save(updatedUser);
    delete updatedUser.password;
    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    console.log(user);
    await this.userRepository.remove(user);

    delete user.password;
    return {
      message: 'Usuario eliminado satisfactoriamente',
      deleted: true,
      user: user,
    };
  }
}
