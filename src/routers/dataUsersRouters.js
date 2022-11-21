import { Router } from "express";
import { getDataUser, postDataUser } from "../controllers/dataUserController.js";
import { validateDataUser, validateGetDataUsers } from "../middleware/dataUsersMiddleware.js";

const router = Router()

router.post("/datausers",validateDataUser, postDataUser)
router.get("/datausers", validateGetDataUsers, getDataUser)

export default router