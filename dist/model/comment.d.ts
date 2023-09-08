import { Model } from 'sequelize';
declare class CommentModel extends Model {
    id: number;
    text: string;
    image: string;
    postId: number;
    userId: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default CommentModel;
