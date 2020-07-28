import express from "express";
import { NameController } from "../controller/NameController";

export const nameRouter = express.Router()

const name = new NameController()

nameRouter.post('/', name.insert)