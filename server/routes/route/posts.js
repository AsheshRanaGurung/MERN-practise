import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import {
  getPosts,
  createPosts,
  upDatePost,
  deletePost,
} from "../../controller/post.controller.js";
import auth from "../middleware/Middleware.js";

const Postrouter = express.Router();

const storagefile = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileDestination = "images";

    if (!fs.existsSync(fileDestination)) {
      fs.mkdirSync(fileDestination, { recursive: true });
    }
    cb(null, fileDestination);
  },
  filename: (req, file, cb) => {
    const name = Date.now() + path.extname(file.originalname);
    cb(null, name);
  },
});
const uploadfile = multer({ storage: storagefile });

Postrouter.get("/", getPosts);
Postrouter.post(
  "/add_post",
  auth,
  uploadfile.single("selectedFile"),
  createPosts
);
Postrouter.patch(
  "/update/:id/",
  auth,
  uploadfile.single("selectedFile"),
  upDatePost
);
Postrouter.delete("/delete/:id/", auth, deletePost);

export default Postrouter;
