import sequelize from '../database/index';
import { Model, DataTypes } from 'sequelize';

enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

class UserModel extends Model {
  public id!: number;
  public full_name!: string;
  public email!: string;
  public password!: string;
  public profile_picture!: string;
  public username!: string;
  public role!: UserRole;
  public otp!: string;
  public verified!: boolean;
  public access!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
      defaultValue: UserRole.USER
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    access: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    // ... other fields
  },
  {
    sequelize,
    modelName: "Users",
    tableName: 'users',
    createdAt: "created_at",
	updatedAt: "updated_at",
  }
);


export default UserModel;