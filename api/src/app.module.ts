import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, AuthModule, ConfigModule.forRoot({}), UsersModule],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
