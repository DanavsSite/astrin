import { UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Req } from '@nestjs/common';
import { Request } from 'express';
// ROUTE http://localhost:3000/auth
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {

  // GET http://localhost:3000/users/me
  @Get('me')
  getme(@Req() req : Request) {
    return req.user;
  }
  
}
