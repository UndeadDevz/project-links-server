import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Template } from '@prisma/client';

@Injectable()
export class TemplateService {
  constructor(private prisma: PrismaService) {}

  async getUserTemplates(user_id: string): Promise<Template[]> {
    return this.prisma.template.findMany({
      where: {
        owner_id: user_id,
      },
    });
  }

  async createTemplate(
    user_id: string,
    data: Prisma.TemplateCreateInput,
  ): Promise<Template> {
    return this.prisma.template.create({
      data: {
        ...data,
        owner: {
          connect: {
            user_id: user_id,
          },
        },
      },
    });
  }
}
