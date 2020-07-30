import express from "express";
import { AddressController } from "../controller/AddressController";
import { TokenManager } from "../services/TokenManager";

export const addressRouter = express.Router()

const address = new AddressController();

addressRouter.post('/', address.insert)