import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUser } from './userDTO/userDTO';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async findAll(): Promise<IUser[]> {
        return this.prisma.user.findMany()
    }

    async createUser(data: Prisma.UserCreateInput): Promise<IUser> {
        return this.prisma.user.create({
            data
        })
    }
}
