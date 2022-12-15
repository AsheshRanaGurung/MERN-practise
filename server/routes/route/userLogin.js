import express from "express";

import { createUser, LoginUser } from "../../controller/user.controller.js";

const UserRouter = express.Router();

UserRouter.post("/new_user", createUser);
UserRouter.post("/", LoginUser);

export default UserRouter;
