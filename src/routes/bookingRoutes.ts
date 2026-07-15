import express from "express";
import { createBooking, getMyBookings, getAllBookings, deleteBooking } from "../controllers/bookingController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// আপনি কোন রাউটে কোনটি দেখাতে চান সে অনুযায়ী সাজানো হলো
router.route("/").post(protect, createBooking).get(protect, getAllBookings);
router.route("/my-bookings").get(protect, getMyBookings);
router.route("/:id").delete(protect, deleteBooking);

export default router;