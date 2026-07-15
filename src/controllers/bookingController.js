"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBookingStatus = exports.getAllBookings = exports.getMyBookings = exports.createBooking = void 0;
const express_1 = require("express");
const Booking_1 = __importDefault(require("../models/Booking"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
// @desc    নতুন বুকিং তৈরি করা
// @route   POST /api/bookings
const createBooking = async (req, res) => {
    try {
        const { workspace, date, startTime, endTime, totalPrice } = req.body;
        const booking = new Booking_1.default({
            user: req.user?._id, // Auth middleware থেকে লগইন করা ইউজারের আইডি
            workspace,
            date,
            startTime,
            endTime,
            totalPrice,
        });
        const createdBooking = await booking.save();
        res.status(201).json(createdBooking);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.createBooking = createBooking;
// @desc    লগইন করা ইউজারের নিজের বুকিংগুলো দেখা
// @route   GET /api/bookings/my-bookings
const getMyBookings = async (req, res) => {
    try {
        // ইউজারের আইডি দিয়ে বুকিং খোঁজা এবং সাথে স্পেসের কিছু তথ্য (populate) নিয়ে আসা
        const bookings = await Booking_1.default.find({ user: req.user?._id }).populate("workspace", "name address price image title");
        res.json(bookings);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.getMyBookings = getMyBookings;
// @desc    অ্যাডমিন হিসেবে ওয়েবসাইটের সমস্ত বুকিং দেখা
// @route   GET /api/bookings/all
const getAllBookings = async (req, res) => {
    try {
        // এখানে আমরা user এবং workspace উভয়েরই কিছু তথ্য populate করে নিয়ে আসছি
        const bookings = await Booking_1.default.find({})
            .populate("user", "name email")
            .populate("workspace", "name title");
        res.json(bookings);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.getAllBookings = getAllBookings;
// @desc    বুকিংয়ের স্ট্যাটাস আপডেট করা (যেমন: pending থেকে confirmed করা)
// @route   PUT /api/bookings/:id/status
const updateBookingStatus = async (req, res) => {
    try {
        const booking = await Booking_1.default.findById(req.params.id);
        if (booking) {
            booking.status = req.body.status || booking.status;
            const updatedBooking = await booking.save();
            res.json(updatedBooking);
        }
        else {
            res.status(404).json({ message: "Booking not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.updateBookingStatus = updateBookingStatus;
// @desc    বুকিং ক্যানসেল বা ডিলিট করা
// @route   DELETE /api/bookings/:id
const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking_1.default.findById(req.params.id);
        if (booking) {
            await booking.deleteOne();
            res.json({ message: "Booking cancelled successfully" });
        }
        else {
            res.status(404).json({ message: "Booking not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.deleteBooking = deleteBooking;
//# sourceMappingURL=bookingController.js.map