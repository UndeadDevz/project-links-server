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

  @Post(':user_id')
  createTemplate(
    @Param('user_id') user_id,
    @Body() data: Prisma.TemplateCreateInput,
  ): Promise<Template> {
    return this.templateService.createTemplate(user_id, data);
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
