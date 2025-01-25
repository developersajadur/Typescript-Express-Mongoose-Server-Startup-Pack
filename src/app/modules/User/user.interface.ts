export type TUser = {
    name: string;
    email: string;
    password: string;
    role: 'customer' | 'admin';
    profileImage?: string;
    isBlocked: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}