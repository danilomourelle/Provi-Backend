import express from "express";
import { PhoneController } from "../controller/PhoneController";

export const phoneRouter = express.Router()

const phone = new PhoneController()

phoneRouter.post('/', phone.insert)