"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../database/index"));
const sequelize_1 = require("sequelize");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
})(UserRole || (UserRole = {}));
class UserModel extends sequelize_1.Model {
}
UserModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    full_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    profile_picture: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(UserRole)),
        allowNull: false,
        defaultValue: UserRole.USER
    },
    otp: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    verified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    access: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    // ... other fields
}, {
    sequelize: index_1.default,
    modelName: "Users",
    tableName: 'users',
    createdAt: "created_at",
    updatedAt: "updated_at",
});
exports.default = UserModel;
