import { Pet } from 'src/pets/entities/pet.entity';
import { capitalizeFirstWords } from 'src/utils/helpers';

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column('text', { select: false, nullable: false }) // para que no devuleva la contraseña
  password: string;

  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', nullable: false })
  lastName: string;

  @Column('text', { name: 'phone', nullable: false })
  phone: string;

  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @Column({ nullable: true })
  facebook?: string;

  @Column({ nullable: true })
  instagram?: string;

  @Column({ nullable: true })
  twitter?: string;

  @Column('bool', { name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'confirmation_token', nullable: true, default: null })
  confirmationToken?: string;

  @Column({ name: 'reset_token', nullable: true, default: null })
  resetToken?: string;

  @Column({ name: 'reset_token_expires', nullable: true, default: null })
  resetTokenExpires?: Date;

  @OneToMany(() => Pet, (pet) => pet.user)
  pets: Pet[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
    this.firstName = capitalizeFirstWords(this.firstName);
    this.lastName = capitalizeFirstWords(this.lastName);
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
