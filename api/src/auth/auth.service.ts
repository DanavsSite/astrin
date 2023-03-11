const collection = import('@dicebear/collection');
const dicebear = import('@dicebear/core');
import { Injectable } from '@nestjs/common';
import { AuthDTO, AuthinDTO } from 'src/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AvatarType } from '@prisma/client';
import { hash as hashpassword } from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import * as argon from 'argon2';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async register(data: AuthDTO) {
    try {
      const { name, password }: AuthDTO = data;
      const email = data.email.toString();
      const hash = (await hashpassword(password)).toString();
      const avatarSVG = (await dicebear)
        .createAvatar((await collection).shapes, {
          seed: data.name,
        })
        .toString();
      const newUser = await this.prisma.user.create({
        data: {
          name,
          userMail: email,
          avatar: avatarSVG,
          avatype: AvatarType.SVG,
          hash,
          isGoogle: false,
        },
      });

      delete newUser.hash;
      const token = await this.signToken(newUser.id, newUser.userMail);
      newUser['token'] = token;
      return newUser;
    } catch (e) {
      if (e.code === 'P2002') {
        return new UnauthorizedException('EMail Already exists');
      }
      return new UnauthorizedException(e);
    }
  }
  async login(dto: AuthinDTO) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          userMail: dto.email,
        },
      });
      const isPw = await argon.verify(user.hash, dto.password);
      if (!isPw)
        return new UnauthorizedException('Incorrect email or password');
      const token = await this.signToken(user.id, user.userMail);
      if (isPw) return { token };
    } catch (e) {
      return new ForbiddenException(e);
    }
  }
  async signToken(userId: String, email: String) {
    const payload = {
      sub: userId,
      email,
    };
    const jwt = await this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
    });
    return jwt;
  }
}
