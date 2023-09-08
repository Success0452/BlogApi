import { Model } from 'sequelize';
import CommentModel from './comment';
declare class PostModel extends Model {
    id: number;
    title: string;
    image: string;
    content: string;
    admin_info: boolean;
    is_deleted: boolean;
    readonly comments?: CommentModel[];
    userId: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default PostModel;
