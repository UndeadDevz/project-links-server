import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TemplateService } from './template.service';
import { Prisma, Template } from '@prisma/client';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get(':user_id')
  getUserTemplates(@Param('user_id') user_id: string): Promise<Template[]> {
    return this.templateService.getUserTemplates(user_id);
  }

  @Post(':user_id')
  createTemplate(
    @Param('user_id') user_id,
    @Body() data: Prisma.TemplateCreateInput,
  ): Promise<Template> {
    return this.templateService.createTemplate(user_id, data);
  }
}
