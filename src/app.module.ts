import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { TemplateController } from './template/template.controller';
import { TemplateService } from './template/template.service';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ImageModule } from './image/image.module';
import { UserModule } from './user/user.module';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CloudinaryModule,
    ImageModule,
    UserModule,
    PassportModule,
  ],
  controllers: [AppController, UserController, TemplateController],
  providers: [
    AppService,
    UserService,
    TemplateService,
    PrismaService,
    JwtService,
    JwtStrategy,
  ],
})
export class AppModule {}
