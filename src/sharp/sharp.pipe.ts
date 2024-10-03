import { Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';

@Injectable()
export class SharpPipe
  implements PipeTransform<Express.Multer.File, Promise<any>>
{
  async transform(image: Express.Multer.File): Promise<any> {
    const originalName = path.parse(image.originalname).name;
    const filename = Date.now() + '-' + originalName + '.webp';

    const buffer = await sharp(image.buffer)
      .resize(450)
      .webp({ effort: 3 })
      .toBuffer();

    return { buffer, filename };
  }
}
