import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { join } from 'path';
import * as QRCode from 'qrcode';
import { customAlphabet } from 'nanoid';
import { InjectRepository } from '@nestjs/typeorm';
import { Qrcode } from './entities/qrcode.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QrcodeService {
  constructor(
    @InjectRepository(Qrcode) private qrcodeRepository: Repository<Qrcode>,
    private configService: ConfigService,
  ) {}

  async generate(quantity) {
    const baseUrl = join(process.cwd());
    const publicUrl = this.configService.get('PUBLIC_URL');
    console.log(publicUrl);

    const generateQRCode = (codigo) => {
      return new Promise((resolve, reject) => {
        const url = `${publicUrl}/pets/${codigo}`;
        const outputFilePath = `${baseUrl}/qrs/${codigo}.png`;
        QRCode.toFile(outputFilePath, url, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(outputFilePath);
          }
        });
      });
    };

    // Crear un array de promesas
    const promises = [];

    const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10);
    const codigos = [];
    for (let i = 0; i < quantity; i++) {
      const codigo = nanoid().toUpperCase();
      codigos.push(codigo);
      promises.push(generateQRCode(codigo));
    }

    //Usar Promise.all para esperar a que todas las promesas se resuelvan
    try {
      const results = await Promise.all(promises);
      const saveQrCodes = await this.qrcodeRepository.save(
        codigos.map((codigo, index) => ({
          code: codigo,
          url: results[index],
        })),
      );
      console.log('Todos los QR generados:', saveQrCodes);
      return 'Todos los QR generados';
    } catch (error) {
      console.error('Error generating QR codes:', error);
      throw new InternalServerErrorException('Error generating QR codes');
    }
  }

  findAll() {
    return this.qrcodeRepository.find();
  }

  async findOne(term: string) {
    let code;
    if (!isUUID(term)) {
      code = await this.qrcodeRepository.findOneBy({ code: term });
    } else {
      code = await this.qrcodeRepository.findOneBy({ id: term });
    }
    if (!code) {
      throw new BadRequestException('QR code not valid');
    }
    return code;
  }
}
