import { Router } from "express";
import { signUpUser, getUsers, signInUser} from "../controllers/usersController.js";
import { validateSignIn, validateSignUp } from "../middleware/usersMiddleware.js";

const router = Router()

router.get("/users", getUsers)
router.post("/signup",validateSignUp, signUpUser)
router.post("/signin",validateSignIn,signInUser)


export default router