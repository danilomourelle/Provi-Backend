import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router()

const user = new UserController()
