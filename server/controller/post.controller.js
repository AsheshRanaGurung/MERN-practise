import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).send(postMessages);
    // res.send(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPosts = async (req, res) => {
  // const image = req.filename;
  // console.log({ image });
  const image = req.file.path;
  const { title, message, tags, creator } = req.body;
  const newPost = new PostMessage({
    title,
    // image,
    message,
    tags,
    creator,
    selectedFile: image,
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const upDatePost = async (req, res) => {
  const { id } = req.params;
  const image = req.file.path;
  const { title, message, tags, creator } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No Post of this ID");
  }
  await PostMessage.findByIdAndUpdate(id, {
    title,
    message,
    tags,
    creator,
    selectedFile: image,
  });

  res.status(201).json("Updated successfully");
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No Post of this ID");
  }
  try {
    await PostMessage.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
