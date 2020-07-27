import express from "express";
import { productRouter } from "./router/productRouter";

const app = express();

app.use(express.json());

export default app;


app.use('/product', productRouter)