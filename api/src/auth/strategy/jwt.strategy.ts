import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import {ConfigService} from '@nestjs/config'
import { PrismaService } from 'src/prisma/prisma.service';
import { userInfo } from 'os';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor( config: ConfigService,private prisma : PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get("JWT_SECRET"),
    });
  }

  
  async validate(payload : {
    sub:String,
    email:String
  }){
    const user = await this.prisma.user.findUnique({
      where:{
        id:payload.sub,
      }
    })
    delete user.hash
    return user
  }
}