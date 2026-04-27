import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controller/auth.controller.js";
import handleAsync from "../utils/CatchAsync.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/signup").post(handleAsync(signup, "signup"));
router.route("/login").post(handleAsync(login, "login"));
router.route("/logout").post(handleAsync(logout, "logout"));
router
  .route("/update-profile")
  .put(
    handleAsync(protectRoute, "protect route"),
    handleAsync(updateProfile, "update profile"),
  );
router
  .route("/check")
  .get(handleAsync(protectRoute, "protect route"), checkAuth);

export default router;
