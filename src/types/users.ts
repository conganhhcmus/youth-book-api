import { JwtPayload } from 'jsonwebtoken';

interface User {
    username: string;
    email: string;
    password: string;
    fullName: string;
    role: number;
    refreshToken: string;
    isActive: boolean;
    wallet: number;
    avatarImg: string;
    updateTime: Date;
    createTime: Date;
}

interface UserJwtPayload extends JwtPayload {
    _id: string;
    username: string;
    email: string;
    fullName: string;
    role: number;
    wallet: number;
    avatarImg: string;
}

export { User, UserJwtPayload };
