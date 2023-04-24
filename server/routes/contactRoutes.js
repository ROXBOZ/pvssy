import express from "express";
import { getAllContacts, addContact } from "../controller/contactController.js";

const router = express.Router();
router.get("/all", getAllContacts);
router.post("/all", addContact);

export default router;
