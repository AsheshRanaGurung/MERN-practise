import mongoose from "mongoose";
const DB_URL = "mongodb://127.0.0.1:27017/mern";
// "mongodb+srv://asheshDon:asheshDon123@cluster0.s25mzi0.mongodb.net/?retryWrites=true&w=majority";

export const connectDB = () => {
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
