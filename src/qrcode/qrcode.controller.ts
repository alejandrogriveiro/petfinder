import { Controller, Get, Post, Param } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('qrcode')
@ApiTags('QrCodes')
export class QrcodeController {
  constructor(private readonly qrcodeService: QrcodeService) {}

  @Post(':quantity')
  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: 'generacion de qrcodes' })
  @ApiBearerAuth()
  create(@Param('quantity') quantity: number) {
    return this.qrcodeService.generate(quantity);
  }

  @Get()
  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: 'listar los codigos de qrcodes' })
  @ApiBearerAuth()
  findAll() {
    return this.qrcodeService.findAll();
  }

  @Get(':term')
  @Auth(ValidRoles.user)
  @ApiOperation({ summary: 'buscq el codigo de qrcode' })
  @ApiBearerAuth()
  findOne(@Param('term') term: string) {
    return this.qrcodeService.findOne(term);
  }
}
