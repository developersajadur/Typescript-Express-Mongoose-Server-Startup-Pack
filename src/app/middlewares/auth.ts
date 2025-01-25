/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import status from "http-status";
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync"
import { verifyToken } from "../modules/Auth/auth.utils";
import config from "../config";
import { UserModel } from "../modules/User/user.model";
import { TUserRole } from "../modules/User/user.interface";
import { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";


const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if(!token){
            throw new AppError(status.UNAUTHORIZED, 'You are not authorized!')
        }
        const decoded = verifyToken(token, config.jwt_token_secret as string)
      
        const { role, userId, iat } = decoded;
        const user:any = UserModel.findById(userId)
        if(!user){
            throw new AppError(status.UNAUTHORIZED, 'User not found!')
        }
        if(user.isBlocked){
            throw new AppError(status.FORBIDDEN, 'User is blocked!')
        }

        
    if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(
          status.UNAUTHORIZED,
          'You are not authorized!',
        );
      }
      (req as any).user = decoded as JwtPayload & { role: string };
      next();
    })
}

export default auth;