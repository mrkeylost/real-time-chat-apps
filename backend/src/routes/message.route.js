import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import handleAsync from "../utils/CatchAsync.js";
import {
  getUserSidebar,
  sendMessage,
} from "../controller/message.controller.js";

const router = express.Router();

router.route(
  "/users",
  handleAsync(protectRoute, "protect route"),
  handleAsync(getUserSidebar, "get user sidebar"),
);
router
  .route("/:id")
  .get(
    handleAsync(protectRoute, "protect route"),
    handleAsync(getUserSidebar, "get user sidebar"),
  );
router
  .route("/send/:id")
  .post(
    handleAsync(protectRoute, "protect route"),
    handleAsync(sendMessage, "send message"),
  );

export default router;
