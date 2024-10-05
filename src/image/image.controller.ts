import {
  Body,
  Controller,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { Prisma } from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { SharpPipe } from 'src/sharp/sharp.pipe';
import { TemplateService } from 'src/template/template.service';
import { UserService } from 'src/user/user.service';

@Controller('image')
export class ImageController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly userService: UserService,
    private readonly templateService: TemplateService,
    private jwt: JwtService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile(SharpPipe) image: Express.Multer.File,
    @Req() request: Request,
  ) {
    const uploadResult = this.cloudinaryService.uploadFile(image);
    const token = request.headers['authorization'].split(' ')[1];
    await this.userService.addImageToMedia(
      this.jwt.verify(token, { secret: process.env.JWT_SECRET }).id,
      (await uploadResult).url,
    );
    return { url: (await uploadResult).url };
  }

  @Put('upload')
  async setImage(
    @Body() data: { template_id: string; index: number; url: string },
  ) {
    console.log('data', data);
    await this.templateService.addImageToElement({
      template_id: data.template_id,
      index: data.index,
      url: data.url,
    });
    return { url: data.url };
  }

  @Put('photo')
  @UseInterceptors(FileInterceptor('image'))
  async uploadPhoto(
    @UploadedFile(SharpPipe) image: Express.Multer.File,
    @Body() data: { template_id: string; index: number },
  ) {
    const uploadResult = this.cloudinaryService.uploadFile(image);
    await this.templateService.addPhotoToMedia(
      data.template_id,
      'https://pbs.twimg.com/profile_images/1599827064282140672/MSxVR5u6_400x400.jpg',
    );
    await this.templateService.addImageToElement({
      template_id: data.template_id,
      index: data.index,
      url: 'https://pbs.twimg.com/profile_images/1599827064282140672/MSxVR5u6_400x400.jpg',
    });
    return { url: 'Todo bien guacho' };
  }
}
