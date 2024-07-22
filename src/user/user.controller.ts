import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './userDTO/userDTO';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Get()
    getAllUsers(): Promise<IUser[]> {
        return this.userService.findAll()
    }

    @Post()
    createUser(@Body() userData: Prisma.UserCreateInput): Promise<IUser> {
        return this.userService.createUser(userData)
    }
}
