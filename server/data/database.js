import mongoose from "mongoose";
import {config } from "dotenv"

config()


const db_url = process.env.db_url

export const connection = mongoose.connect(db_url,{
    dbName : "Email-Generator"

}).then(() => console.log("database is connected"))
.catch((e) => console.log(e));
