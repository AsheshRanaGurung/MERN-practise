import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  first_name: String,
  last_name: String,
  phone_number: Number,
  password: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const UserModel = mongoose.model("UserModel", userSchema);
export default UserModel;
