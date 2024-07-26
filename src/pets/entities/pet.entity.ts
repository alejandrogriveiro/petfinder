import { User } from 'src/user/entities/user.entity';
import { capitalizeFirstWords } from 'src/utils/helpers';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'pets' })
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  code: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  picture: string;

  @Column('text', { nullable: true })
  bio: string;

  @Column('bool', { name: 'is_active', default: true })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.pets, { eager: true })
  user: User;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.name = capitalizeFirstWords(this.name).trim();
    this.code = this.code.toUpperCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
