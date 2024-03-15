import express from "express";
import { registerClient, loginClient, getUsers } from '../controller/authcontroller.js';
import { isAdmin, signinController } from "../middlewares/signinController.js";
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/signUp', registerClient);

router.post('/login', loginClient);

router.get('/users', getUsers)

router.post('/user', signinController, isAdmin)

export default router;