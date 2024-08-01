import { Module } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';
import { QrcodeController } from './qrcode.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Qrcode } from './entities/qrcode.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Qrcode])],
  controllers: [QrcodeController],
  providers: [QrcodeService, ConfigService],
  exports: [QrcodeService, TypeOrmModule],
})
export class QrcodeModule {}
