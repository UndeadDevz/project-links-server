import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
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

  @Post(':user_id')
  createTemplate(
    @Param('user_id') user_id,
    @Body() data: Prisma.TemplateCreateInput,
  ): Promise<Template> {
    return this.templateService.createTemplate(user_id, data);
  }
}
