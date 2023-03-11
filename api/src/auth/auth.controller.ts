import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { AuthDTO, AuthinDTO } from 'src/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';

// ROUTE http://localhost:3000/auth
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  // POST http://localhost:3000/auth/register
  @Post('register')
  async register(@Body() dto: AuthDTO) {
    return this.service.register(dto);
  }

  // POST http://localhost:3000/auth/login
  @Post('login')
  async login(@Body() dto: AuthinDTO) {
    return this.service.login(dto);
  }
}
