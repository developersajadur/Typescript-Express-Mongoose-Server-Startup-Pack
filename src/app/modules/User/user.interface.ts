export type TUser = {
    name: string;
    email: string;
    password: string;
    role: 'user';
    profileImage?: string;
    isBlocked: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}