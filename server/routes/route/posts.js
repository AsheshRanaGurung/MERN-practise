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
Postrouter.post("/add_post", uploadfile.single("selectedFile"), createPosts);
Postrouter.patch("/update/:id/", uploadfile.single("selectedFile"), upDatePost);
Postrouter.delete("/delete/:id/", deletePost);

export default Postrouter;
