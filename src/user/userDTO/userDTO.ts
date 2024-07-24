import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export interface IUser {
  user_id: string;
  email: string;
  username: string;
  image_url: string;
  password: string;
}

export class CreateUserDto {
  @IsString()
  readonly username: string;
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
  @IsString()
  readonly image_url: string;
}
