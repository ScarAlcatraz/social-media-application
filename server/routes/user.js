import express from "express";
import { getUser, getUserFriends, addRemoveFriend } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Read routes
router.get("/:userId", verifyToken, getUser);
router.get("/:userId/friends", verifyToken, getUserFriends);

// Update route ( Add/Remove a friend )
router.patch("/:userId/:friendId", verifyToken, addRemoveFriend);

export default router;
