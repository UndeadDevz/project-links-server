export interface IUser {
    user_id: string;
    email: string;
    username: string;
    image_url: string;
    password: string
}

export type ICreateUserDTO = Omit<IUser, "user_id">