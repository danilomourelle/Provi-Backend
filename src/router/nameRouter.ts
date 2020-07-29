import express from "express";
import { NameController } from "../controller/NameController";
import { TokenManager } from "../services/TokenManager";

export const nameRouter = express.Router()

const name = new NameController(
  new TokenManager()
)

nameRouter.post('/', name.insert)