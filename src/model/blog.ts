import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/index';
import CommentModel from './comment'; // Import the Comment model
import UserModel from './user';

class PostModel extends Model {
  public id!: number;
  public title!: string;
  public image!: string;
  public content!: string;
  public admin_info!: boolean;
  public is_deleted!: boolean;

  public readonly comments?: CommentModel[];

  public userId!: number; 

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PostModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    admin_info: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
  },
  },
  {
    sequelize,
    modelName: 'Posts',
    tableName: 'posts',
    createdAt: "created_at",
	  updatedAt: "updated_at",
  }
);

// Establish the one-to-many relationship
PostModel.hasMany(CommentModel, {
  foreignKey: 'id',
  as: 'comments',
});

// PostModel.(UserModel, {
//     foreignKey: 'id',
//     as: 'user',
// });

export default PostModel;
