import express from 'express'
import auth from "./../auth.js"
import { signUp , login, logout} from '../controllers/authController.js';
const router = new express.Router();

router.post("/signUp" , signUp)
router.post("/login",  login)
router.post("/logout" , logout)

export default router