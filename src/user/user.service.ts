import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUser } from './userDTO/userDTO';
import { Prisma, Template, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

type Tokens = {
  access_token: string;
  refresh_token: string;
};

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findUserWhitTemplates(user_id: string): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        user_id,
      },
      include: {
        template: {
          select: {
            name: true,
            template_id: true,
          },
        },
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async loginUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user.password === password) {
      const payload = {
        id: user.user_id,
        email: user.email,
        name: user.username,
      };

      return {
        access_token: await this.jwt.signAsync(payload, {
          secret: process.env.JWT_SECRET,
          expiresIn: '1d',
        }),
        refresh_token: await this.jwt.signAsync(payload, {
          secret: process.env.JWT_SECRET_REFRESH,
          expiresIn: '5d',
        }),
        message: 'Login Successful',
      };
    } else {
      return { message: 'Incorrecto' };
    }
  }

  async findUser(token: any) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: token.email,
      },
    });

    return { user_id: user.user_id, username: user.username };
  }

  async refreshToken(refreshToken: string) {
    try {
      const user = this.jwt.verify(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH,
      });
      const payload = {
        id: user.user_id,
        email: user.email,
        name: user.username,
      };
      const { access_token, refresh_token } =
        await this.generateTokens(payload);
      return {
        access_token,
        refresh_token,
        status: 200,
        message: 'Refresh token',
      };
    } catch (error) {
      throw new HttpException(
        'Refresh Token not valid',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private async generateTokens(user): Promise<Tokens> {
    const jwtPayload = {
      id: user.user_id,
      email: user.email,
      name: user.username,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(jwtPayload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d',
      }),
      this.jwt.signAsync(jwtPayload, {
        secret: process.env.JWT_SECRET_REFRESH,
        expiresIn: '5d',
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async addImageToMedia(user_id: string, url: string): Promise<User> {
    return this.prisma.user.update({
      where: { user_id },
      data: {
        media: {
          push: url,
        },
      },
    });
  }
}
