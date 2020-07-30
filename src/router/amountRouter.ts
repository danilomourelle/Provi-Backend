import express from "express";
import { AmountController } from "../controller/AmountController";
import { TokenManager } from "../services/TokenManager";

export const amountRouter = express.Router()

const amount = new AmountController()

amountRouter.post('/', amount.insert)