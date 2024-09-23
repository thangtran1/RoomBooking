import express from "express";
import verifyToken from "../middlewares/verifyToken";
import * as userController from "../controllers/user";
import { deleteUser } from "../controllers/user";

const router = express.Router();
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

router.put("/update/:id", userController.updateUserUD);
router.use(verifyToken);
router.get("/get-current", userController.getCurrent);

export default router;
