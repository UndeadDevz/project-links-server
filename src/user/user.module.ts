import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
  providers: [UserService, PrismaService, JwtService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
