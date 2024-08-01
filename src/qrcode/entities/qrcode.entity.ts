import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'qrcodes' })
export class Qrcode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'qr-code' })
  code: string;
}
