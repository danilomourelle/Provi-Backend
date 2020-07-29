import express from "express";
import { PhoneController } from "../controller/PhoneController";
import { TokenManager } from "../services/TokenManager";

export const phoneRouter = express.Router()

const phone = new PhoneController(
  new TokenManager()
)

phoneRouter.post('/', phone.insert)