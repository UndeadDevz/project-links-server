import { Module } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ImageController } from './image.controller';
import { UserModule } from 'src/user/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModule],
  providers: [CloudinaryService, JwtService],
  controllers: [ImageController],
})
export class ImageModule {}
