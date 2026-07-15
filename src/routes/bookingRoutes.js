"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingController_1 = require("../controllers/bookingController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// সাধারণ ইউজারের রাউট
router.route("/").post(authMiddleware_1.protect, bookingController_1.createBooking);
router.route("/my-bookings").get(authMiddleware_1.protect, bookingController_1.getMyBookings);
// বুকিং ডিলিট করার রাউট (এটিই মূলত কাজ করবে)
router.route("/:id").delete(authMiddleware_1.protect, bookingController_1.deleteBooking);
// শুধুমাত্র অ্যাডমিনের রাউট 
router.route("/all").get(authMiddleware_1.protect, authMiddleware_1.admin, bookingController_1.getAllBookings);
router.route("/:id/status").put(authMiddleware_1.protect, authMiddleware_1.admin, bookingController_1.updateBookingStatus);
exports.default = router;
//# sourceMappingURL=bookingRoutes.js.map