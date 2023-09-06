import {Router} from 'express';
import { IRoute } from "../interfaces/routes/route.interface";
import multer from 'multer';
import { 
    addPost,
    hardDeletePost,
    softDeletePost,
    retrievePostByID,
    retrievePosts,
    updatePost,
    retrieveMyPosts,
    uploadPostImage
} from '../controller/blog';

import { 
    addComment,
    deleteComment,
    retrieveComments,
    retrieveSpecificComment,
    updateComment
} from '../controller/comment';

import {protect} from '../util/protect'

const storage = multer.memoryStorage(); // Store the uploaded file in memory
const upload = multer({ storage: storage });

class BlogRoute implements IRoute {
    public path: string = "/posts"
    public router: Router = Router()

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(){
        {/* posts routes */}
        this.router.post(this.path + "/upload-post-image", upload.single('post'), uploadPostImage);
        this.router.post(this.path + "/", protect, addPost);
        this.router.patch(this.path + "/:postId/soft", protect, softDeletePost);
        this.router.delete(this.path + "/:postId/hard", protect, hardDeletePost);
        this.router.get(this.path + "/:postId", protect, retrievePostByID);
        this.router.get(this.path + "/", protect, retrievePosts);
        this.router.get(this.path + "/single/posts", protect, retrieveMyPosts);
        this.router.patch(this.path + "/:postId", protect, updatePost);

        {/* comments routes */}
        this.router.post(this.path + "/:postId/post/comments", protect, addComment);
        this.router.delete(this.path + "/:postId/:commentId", protect, deleteComment);
        this.router.get(this.path + "/:postId/:commentId", protect, retrieveSpecificComment);
        this.router.get(this.path + "/:commentId/post/comments", protect, retrieveComments);
        this.router.patch(this.path + "/:postId/:commentId/post/comments", protect, updateComment);
    }
}


export default BlogRoute
