import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { Prisma, Template } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import prisma from '../../lib/prisma';

@Controller('template')
export class TemplateController {
  constructor(
    private readonly templateService: TemplateService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  getUserTemplates(@Req() request: Request): Promise<Template[]> {
    const token = request.headers['authorization'].split(' ')[1];

    const { id } = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    return this.templateService.getUserTemplates(id);
  }

  @Get(':id')
  getTemplate(@Param('id') id: string): Promise<Template> {
    return this.templateService.getTemplate(id);
  }

  @Post()
  createTemplate(@Req() request: Request): Promise<Template> {
    const token = request.headers['authorization'].split(' ')[1];
    const { id } = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    const data = {
      items: [],
      linkStyle: {
        background: '#ffffff',
        borderColor: '#DDDDDD',
        borderWidth: '1px',
        borderRadius: '5px',
        hoverAnimation: 'fade',
        fontSize: '1rem',
        fontColor: '#7d7aff',
        fontWeight: '600',
      },
      headerStyle: {
        fontSize: '1.5rem',
        fontColor: '#fa0000',
        fontWeight: 'semibold',
      },
      titleStyle: {
        fontSize: '2rem',
        fontFamily: 'oblique',
        fontColor: '#11ff00',
        fontWeight: '600',
      },
      name: '',
      background: '#ffffff',
      photo:
        'https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg',
      title: '',
    };
    return this.templateService.createTemplate(id, data);
  }

  @Put(':id')
  updateTemplate(
    @Param('id') id,
    @Body() data: Prisma.TemplateUpdateInput,
  ): Promise<Template> {
    return this.templateService.updateTemplate(id, data);
  }

  @Delete(':id')
  deleteTemplate(@Param('id') id): Promise<Template> {
    return this.templateService.deleteTemplate(id);
  }
}
