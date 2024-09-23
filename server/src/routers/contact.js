import express from "express";
import * as contactController from "../controllers/contact";

const router = express.Router();
router.post("/create-contact", contactController.createContact);
router.get("/all-contact", contactController.getAllContact);
router.delete("/contacts/:id", contactController.deleteContact);
router.put("/contacts/:id", contactController.updateContact);

export default router;
