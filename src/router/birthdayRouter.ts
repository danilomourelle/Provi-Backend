import express from "express";
import { BirthdayController } from "../controller/BirthdayController";

export const birthdayRouter = express.Router()

const birthday = new BirthdayController()

birthdayRouter.post('/', birthday.insert)