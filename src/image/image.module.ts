import { Module } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ImageController } from './image.controller';
import { UserModule } from 'src/user/user.module';
import { JwtService } from '@nestjs/jwt';
import { TemplateService } from 'src/template/template.service';

@Module({
  imports: [UserModule],
  providers: [CloudinaryService, JwtService, TemplateService],
  controllers: [ImageController],
})
export class ImageModule {}
