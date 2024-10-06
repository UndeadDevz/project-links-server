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
}
