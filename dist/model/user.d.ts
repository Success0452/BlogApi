import { Model } from 'sequelize';
declare enum UserRole {
    ADMIN = "admin",
    USER = "user"
}
declare class UserModel extends Model {
    id: number;
    full_name: string;
    email: string;
    password: string;
    profile_picture: string;
    username: string;
    role: UserRole;
    otp: string;
    verified: boolean;
    access: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default UserModel;
