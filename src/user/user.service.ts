import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUser } from './userDTO/userDTO';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany()
    }

    async findUserWhitTemplates(user_id: string): Promise<User[]> {
        return this.prisma.user.findMany({
            where: {
                user_id
            },
            include: {
                template: {
                    select: {
                        name: true,
                        template_id: true
                    }
                }
            }
        })
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
            data
        })
    }

    async addImageToMedia(user_id: string, url: string): Promise<User> {
        return this.prisma.user.update({
            where: { user_id },
            data: {
                media: {
                    push: url
                }
            }
        })
    }
}
