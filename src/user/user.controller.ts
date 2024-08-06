import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/withTemplates/:user_id')
  getUserWhitTemplates(@Param('user_id') user_id): Promise<User[]> {
    return this.userService.findUserWhitTemplates(user_id);
  }

  @Post()
  createUser(@Body() userData: Prisma.UserCreateInput): Promise<User> {
    return this.userService.createUser(userData);
  }
}
