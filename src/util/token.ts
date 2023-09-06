import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index';

export const generateToken = (id: number) => {
    return sign({ id }, JWT_SECRET!, { expiresIn: "30d" })
}