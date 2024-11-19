import express from "express"
import {updateUserProfile , getUserDetailsById} from '../controller/updateUser.js'
import { isauthenticated } from "../middleware/authentication.js";

const router = express.Router()

router.put("/update-profile", isauthenticated, updateUserProfile);
router.get("/getUserDetails/:userId", getUserDetailsById);

export default router