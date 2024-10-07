import { Injectable } from '@nestjs/common';

import { Prisma, Template } from '@prisma/client';
import prisma from 'lib/prisma';

interface Props {
  template_id: string;
  index: number;
  url: string;
}

@Injectable()
export class TemplateService {
  constructor() {}

  async getUserTemplates(user_id: string): Promise<Template[]> {
    return prisma.template.findMany({
      where: {
        owner_id: user_id,
      },
    });
  }

  async getTemplate(id: string): Promise<Template> {
    return prisma.template.findUnique({
      where: {
        template_id: id,
      },
    });
  }

  async createTemplate(user_id: string, data: any): Promise<Template> {
    return prisma.template.create({
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
    return prisma.template.update({
      where: {
        template_id: id,
      },
      data,
    });
  }

  async addPhotoToMedia(template_id: string, url: string): Promise<Template> {
    return prisma.template.update({
      where: { template_id },
      data: {
        photo: url,
      },
    });
  }
  async deleteTemplate(id: string): Promise<Template> {
    return prisma.template.delete({
      where: {
        template_id: id,
      },
    });
  }
}
