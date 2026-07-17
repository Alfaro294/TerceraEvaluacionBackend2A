import express from "express";
import ticketsController from "../controllers/ticketsController.js";
import { validateAuthCookie } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.route("/")
.get(validateAuthCookie(["admin"]),ticketsController.getTickets)
.post(validateAuthCookie(["customer"]),ticketsController.insertTickets);

router.route("/:id")
.put(validateAuthCookie(["admin"], ["customer"]), ticketsController.updateTickets)
.delete(validateAuthCookie(["admin"]), ticketsController.deleteTickers);

export default router;













