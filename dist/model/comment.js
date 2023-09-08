"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../database/index")); // Import your Sequelize instance
class CommentModel extends sequelize_1.Model {
}
CommentModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    text: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    userId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    postId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: index_1.default,
    modelName: 'Comments',
    tableName: 'comments',
    createdAt: "created_at",
    updatedAt: "updated_at",
});
exports.default = CommentModel;
