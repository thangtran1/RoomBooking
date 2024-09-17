import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import initRouters from "./src/routers";
import connectDatabase from "./src/config/connectDatabase";
import generateCode from "./src/ultis/generateCode";
import generateDate from "./src/ultis/generateDate";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

initRouters(app);
connectDatabase();
const port = process.env.PORT || 8888;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
