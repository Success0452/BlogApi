import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/index'; // Import your Sequelize instance
import UserModel from './user';
import PostModel from './blog';

class CommentModel extends Model {
  public id!: number;
  public text!: string;
  public image!: string;
  public postId!: number;

  public userId!: number; 

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CommentModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Comments',
    tableName: 'comments',
    createdAt: "created_at",
	updatedAt: "updated_at",
  }
);

export default CommentModel;
