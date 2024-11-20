import express from 'express'
import validators from "../../../middlewares/validators.js";
import userController from "../controllers/userController.js";
import { verifyToken } from '../../../utils/token.js';

const router = express.Router();

router.post("/add-user", validators.userValidator, userController.addUser);
router.delete("/delete-user/:id", verifyToken,userController.deleteUser);
router.put("/update-user/:id",verifyToken, validators.userCheckValidator,userController.updateUser);
router.get("/get-user/:id", verifyToken,userController.getUser);

export default router;
