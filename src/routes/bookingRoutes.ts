// import express from "express";
// import { 
//   createBooking, 
//   getMyBookings, 
//   getAllBookings, 
//   updateBookingStatus,
//   deleteBooking
// } from "../controllers/bookingController";
// import { protect, admin } from "../middlewares/authMiddleware";

// const router = express.Router();

// // সাধারণ ইউজারের রাউট
// router.route("/").post(protect, createBooking);
// router.route("/my-bookings").get(protect, getMyBookings);
// // বুকিং ডিলিট করার রাউট (এটিই মূলত কাজ করবে)
// router.route("/:id").delete(protect, deleteBooking); 

// // শুধুমাত্র অ্যাডমিনের রাউট 
// router.route("/all").get(protect, admin, getAllBookings);
// router.route("/:id/status").put(protect, admin, updateBookingStatus);

// export default router;

import express from "express";
import { createBooking, getBookings, deleteBooking } from "../controllers/bookingController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createBooking).get(protect, getBookings);
router.route("/:id").delete(protect, deleteBooking);

export default router;