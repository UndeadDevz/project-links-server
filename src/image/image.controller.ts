import { Body, Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
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
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(
        @UploadedFile(SharpPipe) image: Express.Multer.File,
        @Body('user_id') user_id: string,
    ) {
        const uploadResult = this.cloudinaryService.uploadFile(image)

        await this.userService.addImageToMedia(user_id, (await uploadResult).url)

        return { url: (await uploadResult).url }
    }
}
