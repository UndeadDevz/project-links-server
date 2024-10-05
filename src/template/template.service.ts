import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Template } from '@prisma/client';

interface Props {
  template_id: string;
  index: number;
  url: string;
}

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

  async getTemplate(id: string): Promise<Template> {
    return this.prisma.template.findUnique({
      where: {
        template_id: id,
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

  async updateTemplate(
    id: string,
    data: Prisma.TemplateUpdateInput,
  ): Promise<Template> {
    return this.prisma.template.update({
      where: {
        template_id: id,
      },
      data,
    });
  }

  async addPhotoToMedia(template_id: string, url: string): Promise<Template> {
    return this.prisma.template.update({
      where: { template_id },
      data: {
        photo: url,
      },
    });
  }

  async addImageToElement({
    template_id,
    index,
    url,
  }: Props): Promise<Template> {
    const template = await this.prisma.template.findUnique({
      where: { template_id },
    });
    if (!template || !template.items) {
      throw new Error('Template not found or has no items');
    }

    if (index < 0 || index >= template.items.length) {
      throw new Error('Index out of bounds');
    }
    template.items[index].image = url;
    return this.prisma.template.update({
      where: { template_id },
      data: {
        items: template.items,
      },
    });
  }
}
