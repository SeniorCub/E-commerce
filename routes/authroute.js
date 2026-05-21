import express from "express";
import { registerClient, loginClient } from '../controller/authcontroller.js';
import { isAdmin, signinController } from "../middlewares/signinController.js";
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/signUp', registerClient);

router.post('/login', loginClient);

router.get('/user', signinController, isAdmin)

export default router;