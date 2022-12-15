import express from "express";
import PostRouter from "./route/posts.js";
import UserRouter from "./route/userLogin.js";

export const router = express.Router();

router.use("/post", PostRouter);
router.use("/login", UserRouter);
