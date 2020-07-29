import express from "express";
import { CPFController } from "../controller/CPFController";
import { TokenManager } from "../services/TokenManager";

export const cpfRouter = express.Router()

const cpf = new CPFController(
  new TokenManager()
)

cpfRouter.post('/', cpf.insert)