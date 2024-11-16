import express from "express"
import {updateUserProfile , getUserDetails} from '../controller/updateUser.js'
import { isauthenticated } from "../middleware/authentication.js";

const router = express.Router()

router.put("/update-profile", isauthenticated, updateUserProfile);
router.get("/getUserDetails", isauthenticated, getUserDetails);

export default router