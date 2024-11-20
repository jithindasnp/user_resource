import authenticationControllers from "../controllers/authenticationControllers.js";
import express from 'express'

const router = express.Router();

router.post("/user-login", authenticationControllers.login);


export default router;