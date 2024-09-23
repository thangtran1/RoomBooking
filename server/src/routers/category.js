import express from "express";
import * as controllers from "../controllers/category";
import checkAdminRole from "../middlewares/checkAdminRole";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();
router.get("/all", controllers.getCategories);
router.post("/categories", controllers.createCategory);
router.put("/categories/:id", controllers.updateCategory);
router.delete("/categories/:id", controllers.deleteCategory);

router.post("/", verifyToken, checkAdminRole, controllers.createCategory);

export default router;
