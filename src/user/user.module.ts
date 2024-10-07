import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
  providers: [UserService, JwtService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
