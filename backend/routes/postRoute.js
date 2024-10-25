import express from 'express';
import { addCommentToPost, createPost, createStory, getAllPosts, getAllStory, getPostByUserId, likePost, sharePost } from '../controllers/postController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import upload from '../config/cloudinary.js';

const router = express.Router();

// Create post with media upload
router.post('/posts', authMiddleware, upload.single('media'), createPost);

//get post route
router.get("/posts", authMiddleware, getAllPosts);
//get post by userid
router.get('/posts/user/:userId', authMiddleware, getPostByUserId);
//user like post route
router.post('/posts/likes/:postId', authMiddleware, likePost);
//user comments post route
router.post('/posts/comments/:postId', authMiddleware, addCommentToPost);
//user share post route
router.post('/posts/share/:postId', authMiddleware, sharePost)
//create story
router.post('/story', authMiddleware, createStory);
//get all story
router.get('/story', authMiddleware, getAllStory)

export default router;
