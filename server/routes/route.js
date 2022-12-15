import express from "express";
import PostRouter from "./route/posts.js";
import UserRouter from "./route/userLogin.js";
import auth from "./middleware/Middleware.js";

export const router = express.Router();

router.use("/post", auth, PostRouter);
router.use("/login", UserRouter);
