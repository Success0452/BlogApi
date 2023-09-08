"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../database/index"));
const comment_1 = __importDefault(require("./comment")); // Import the Comment model
class PostModel extends sequelize_1.Model {
}
PostModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    admin_info: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    is_deleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize: index_1.default,
    modelName: 'Posts',
    tableName: 'posts',
    createdAt: "created_at",
    updatedAt: "updated_at",
});
// Establish the one-to-many relationship
PostModel.hasMany(comment_1.default, {
    foreignKey: 'id',
    as: 'comments',
});
// PostModel.(UserModel, {
//     foreignKey: 'id',
//     as: 'user',
// });
exports.default = PostModel;
