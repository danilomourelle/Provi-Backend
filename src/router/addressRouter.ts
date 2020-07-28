import express from "express";
import { AddressController } from "../controller/AddressController";

export const addressRouter = express.Router()

const address = new AddressController()

addressRouter.post('/', address.insert)