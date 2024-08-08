import { ITemplate } from 'src/template/templateDTO/templateDTO';
import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export interface IUser {
  user_id: string;
  email: string;
  username: string;
  image_url: string;
  password: string;
  template: ITemplate[];
  media: string[];
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
  readonly template: ITemplate[];
  readonly media: string[];
}
