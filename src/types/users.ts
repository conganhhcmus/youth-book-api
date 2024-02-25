import { JwtPayload } from 'jsonwebtoken';

interface User {
    username: string;
    email: string;
    password: string;
    fullName: string;
    role: number;
    refreshToken: string;
    isActive: boolean;
}

interface UserJwtPayload extends JwtPayload {
    _id: string;
    username: string;
    email: string;
    fullName: string;
    role: number;
}

export { User, UserJwtPayload };
