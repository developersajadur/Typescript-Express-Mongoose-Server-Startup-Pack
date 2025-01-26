import { USER_ROLE } from "./user.constant";

export type TUser = {
    name: string;
    email: string;
    number: string | number;
    password: string;
    role: 'customer' | 'admin';
    profileImage?: string;
    isBlocked: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export type TUserRole = keyof typeof USER_ROLE ;