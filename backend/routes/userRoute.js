import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { checkUserAuth, deleteUserFromRequest, followUser, getAllFriendsRequest, getAllMutualFriends, getAllUser, getAllUserForRequest, getUserProfile, unfollowUser } from "../controllers/userController.js";
import { createOrUpdateUserBio, updateCoverPhoto, updateUserProfile } from "../controllers/createOrUpdateController.js";
import upload from "../config/cloudinary.js";
const router = express.Router();


//user follow 
router.post('/follow', authMiddleware, followUser);
//user unfollow
router.post('/unfollow', authMiddleware, unfollowUser);
//remove user from request
router.post('/friend-request/remove', authMiddleware, deleteUserFromRequest);
//get all friends request
router.get('/friend-request', authMiddleware, getAllFriendsRequest);
//get all friends for request
router.get('/user-to-request', authMiddleware, getAllUserForRequest);
//get all mutual friends 
router.get('/mutual-friends/:userId', authMiddleware, getAllMutualFriends)
//get all users fror search 
router.get('/', authMiddleware, getAllUser);
//get all users fror search 
router.get('/check-auth', authMiddleware, checkUserAuth);
//get all users fror search 
router.get('/profile/:userId', authMiddleware, getUserProfile);
//create or update user bio
router.put('/bio/:userId', authMiddleware, createOrUpdateUserBio)


// update user profile
router.put('/profile/:userId', authMiddleware, updateUserProfile)


// update user cover
router.put('/profile/cover-photo/:userId', authMiddleware, updateCoverPhoto)



export default router;