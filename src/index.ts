import express from "express";
import { userRouter } from "./router/userRouter";
import { addressRouter } from "./router/addressRouter";
import { birthdayRouter } from "./router/birthdayRouter";
import { cpfRouter } from "./router/CPFRouter";
import { nameRouter } from "./router/nameRouter";
import { phoneRouter } from "./router/phoneRouter";
import { amountRouter } from "./router/amountRouter";

const app = express();

app.use(express.json());

app.use('/user', userRouter)
app.use('/address', addressRouter)
app.use('/birthday', birthdayRouter)
app.use('/cpf', cpfRouter)
app.use('/name', nameRouter)
app.use('/phone', phoneRouter)
app.use('/amount', amountRouter)

export default app;