import { Module } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ImageController } from './image.controller';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [UserModule],
    providers: [CloudinaryService],
    controllers: [ImageController],
})
export class ImageModule { }
