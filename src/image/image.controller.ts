import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { SharpPipe } from 'src/sharp/sharp.pipe';
import { UserService } from 'src/user/user.service';

@Controller('image')
export class ImageController {
    constructor(
        private readonly cloudinaryService: CloudinaryService,
        private readonly userService: UserService,
    ) { }

    @Post('upload')
<<<<<<< Updated upstream
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile(SharpPipe) file: Express.Multer.File) {
        return this.cloudinaryService.uploadFile(file)
=======
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(
        @UploadedFile(SharpPipe) image: Express.Multer.File,
        @Body('userId') userId: string,
    ) {
        const uploadResult = this.cloudinaryService.uploadFile(image)

        await this.userService.addImageToMedia(userId, (await uploadResult).url)

        return { url: (await uploadResult).url }
>>>>>>> Stashed changes
    }
}
