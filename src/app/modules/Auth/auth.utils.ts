/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TJwtPayload } from './auth.service';
export const createToken = (
  jwtPayload: TJwtPayload,
  secret: string,
  expiresIn: any
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn: expiresIn
  });
};
export const verifyToken = (token: string, secret: string) => {
return jwt.verify(token, secret) as JwtPayload;
}