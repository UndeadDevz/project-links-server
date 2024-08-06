import { ITemplate } from "src/template/templateDTO/templateDTO";

export interface IUser {
    user_id: string;
    email: string;
    username: string;
    image_url: string;
    password: string
    template: ITemplate[]
    media: string[]
}

export type ICreateUserDTO = Omit<IUser, "user_id">