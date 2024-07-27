import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Creación del usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  @ApiResponse({ status: 409, description: 'Usuario ya existe' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login de usuario' })
  @ApiResponse({
    status: 200,
    description: 'Te has logueado exitosamente',
    example: {
      id: '3fdc7285-0b39-48a5-a03c-741469d6b771',
      email: 'usuario@gmail.com',
      firstName: 'Juan',
      lastName: 'Perez',
      isActive: true,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNmZGM3Mjg1LTBiMzktNDhhNS1hMDNjLTc0MTQ2OWQ2Yjc3MSIsImlhdCI6MTcyMjAyMTkxNywiZXhwIjoxNzIyMDIxOTc3fQ.if1cF0NkyGSBBUrtK7Gk6h0Uv4IhQnFemjFqPXbjS2w',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Credenciales invalidas',
    example: {
      statusCode: 400,
      message: 'Credenciales no validas',
      error: 'Bad Request',
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Tu cuenta no esta activa',
    example: {
      statusCode: 401,
      message: 'La Cuenta no fue activada',
      error: 'Unauthorized',
    },
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('check-status')
  @ApiOperation({ summary: 'Chequea estado del usuario segun el token' })
  @ApiResponse({ status: 200, description: 'Usuario revalidado' })
  @ApiUnauthorizedResponse({ description: 'Credenciales no validas' })
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }
}
