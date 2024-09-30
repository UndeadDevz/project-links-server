import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, IUser } from './userDTO/userDTO';
import { Prisma, User } from '@prisma/client';
import { JwtAuthGuard } from 'src/guard/jwtAuth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/withTemplates/:user_id')
  getUserWhitTemplates(@Param('user_id') user_id): Promise<User[]> {
    return this.userService.findUserWhitTemplates(user_id);
  }

  @Post('register')
  createUser(@Body() userData: Prisma.UserCreateInput): Promise<User> {
    return this.userService.createUser(userData);
  }

  @Post('login')
  login(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    return this.userService.loginUser(email, password);
  }

  @Post('refresh')
  refreshToken(@Req() request: Request) {
    const [type, token] = request.headers['authorization']?.split(' ') || [];
    return this.userService.refreshToken(token);
  }

  @Get('test')
  @UseGuards(JwtAuthGuard)
  test() {
    return 'Entra';
  }
}
