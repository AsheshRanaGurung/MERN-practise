import mongoose from "mongoose";
import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  const { email, password, first_name, last_name, phone_number } = req.body;

  try {
    let user = await UserModel.findOne({ email: email });

    if (user) {
      return res.status(400).send({ message: "Email already exists" });
    }

    const newUser = new UserModel({
      email,
      password,
      first_name,
      last_name,
      phone_number,
    });

    const salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    const payload = {
      newUser: {
        id: newUser._id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7 days" },
      (err, token) => {
        console.log(err);
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });

    if (!user) {
      res.status(500), json({ message: "Could not find your Email" });
    }
    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(400).json({ message: "Password did not match" });
    }
    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "30 days" },
      (err, token) => {
        if (err) throw err;
        res.json({ token, first_name: user.first_name, id: user.id });
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
