import express from "express";
import { UserController } from "../controller/UserController";
import { TokenManager } from "../services/TokenManager";

export const userRouter = express.Router()

const user = new UserController()

userRouter.post('/register', user.register)