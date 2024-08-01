import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { AuthModule } from 'src/auth/auth.module';
import { QrcodeService } from 'src/qrcode/qrcode.service';
import { QrcodeModule } from 'src/qrcode/qrcode.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), AuthModule, QrcodeModule],
  controllers: [PetsController],
  providers: [PetsService, QrcodeService, ConfigService],
  exports: [PetsService, TypeOrmModule],
})
export class PetsModule {}
