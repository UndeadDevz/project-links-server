import { Module } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ImageController } from './image.controller';
import { UserModule } from 'src/user/user.module';
import { JwtService } from '@nestjs/jwt';
import { TemplateService } from 'src/template/template.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [UserModule],
  providers: [CloudinaryService, JwtService, TemplateService, PrismaService],
  controllers: [ImageController],
})
export class ImageModule {}
