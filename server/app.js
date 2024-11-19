import express from 'express'
import cookieParser from "cookie-parser";
import cors from "cors"
import { connection } from "./data/database.js";
import authRouter from "./routes/authRouter.js";
import userDetails from "./routes/userDetails.js"
import { errormiddlware } from './middleware/error.js';
export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: '*',
  methods:["GET","POST","PUT","DELETE"],
  credentials:true,
}))

app.use("/api/auth",authRouter);
app.use("/api/user",userDetails);
// app.use("/api/v1/task",taskRouter);

app.get("/", (req, res) => {
  res.send("hello API");
}); 

const port = 3000;
app.listen(port, () => {
    console.log(`server is working on`,port);
  });

app.use(errormiddlware)