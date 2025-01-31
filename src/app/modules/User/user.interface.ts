import { Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TCarts = {
    productId: Types.ObjectId;
    orderQuantity: number;
}

export type TUser = {
    name: string;
    email: string;
    number: string | number;
    password: string;
    role: 'customer' | 'admin';
    profileImage?: string;
    isBlocked: boolean;
    carts?: TCarts[];
    createdAt?: Date;
    updatedAt?: Date;
}

export type TUserRole = keyof typeof USER_ROLE ;