import express from "express"
import {register} from '../controller/userall.js'

const router = express.Router()
router.post("/register", register);


export default router