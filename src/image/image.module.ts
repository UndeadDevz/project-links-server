import { Module } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ImageController } from './image.controller';

@Module({
    providers: [CloudinaryService],
    controllers: [ImageController]
})
export class ImageModule { }
