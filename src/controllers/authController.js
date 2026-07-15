"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = exports.registerUser = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
// JWT টোকেন তৈরি করার ফাংশন
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
// @desc    নতুন ইউজার রেজিস্ট্রেশন করা
// @route   POST /api/users/register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // চেক করা ইউজার আগে থেকেই আছে কি না
        const userExists = await User_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "User already exists with this email" });
            return;
        }
        // নতুন ইউজার তৈরি করা
        const user = await User_1.default.create({
            name,
            email,
            password,
        });
        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id),
            });
        }
        else {
            res.status(400).json({ message: "Invalid user data" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.registerUser = registerUser;
// @desc    ইউজার লগইন করা
// @route   POST /api/users/login
const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // ইমেইল দিয়ে ইউজার খোঁজা
        const user = await User_1.default.findOne({ email });
        // ইউজার থাকলে এবং পাসওয়ার্ড মিললে টোকেন দেওয়া
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id),
            });
        }
        else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.authUser = authUser;
//# sourceMappingURL=authController.js.map