import express from "express";
import { CPFController } from "../controller/CPFController";

export const cpfRouter = express.Router()

const cpf = new CPFController()

cpfRouter.post('/', cpf.insert)