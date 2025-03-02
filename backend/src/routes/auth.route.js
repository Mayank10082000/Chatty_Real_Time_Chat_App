import express from "express";

import {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
  resetPassword,
  forgotPassword,
  deleteAccount,
} from "../controllers/auth.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.delete("/delete-account", protectRoute, deleteAccount);

export default router;
