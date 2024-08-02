import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { SharpPipe } from 'src/sharp/sharp.pipe';

@Controller('image')
export class ImageController {
    constructor(private readonly cloudinaryService: CloudinaryService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile(SharpPipe) file: Express.Multer.File) {
        return this.cloudinaryService.uploadFile(file)
    }
}
