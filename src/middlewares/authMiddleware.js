"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.protect = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importStar(require("../models/User"));
// এই ফাংশনটি চেক করবে ইউজারের কাছে সঠিক টোকেন আছে কি না
const protect = async (req, res, next) => {
    let token;
    // হেডারে Authorization এবং Bearer টোকেন আছে কি না চেক করা
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // টোকেনটি আলাদা করা (Bearer <token> থেকে শুধু টোকেনটা নেওয়া)
            token = req.headers.authorization.split(" ")[1];
            // টোকেন ডিকোড বা ভেরিফাই করা
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            // ডেটাবেস থেকে ইউজার খুঁজে বের করে পাসওয়ার্ড বাদে বাকি ডেটা req.user-এ সেট করা
            const user = await User_1.default.findById(decoded.id).select("-password");
            if (user) {
                req.user = user;
                next(); // টোকেন সঠিক হলে পরের ধাপে যেতে দেওয়া হবে
            }
            else {
                res.status(401).json({ message: "User not found" });
            }
        }
        catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }
    // যদি কোনো টোকেন না পাওয়া যায়
    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};
exports.protect = protect;
// এই ফাংশনটি চেক করবে ইউজার অ্যাডমিন কি না
const admin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next(); // ইউজার অ্যাডমিন হলে কাজ করতে পারবে
    }
    else {
        res.status(403).json({ message: "Not authorized as an admin" }); // অ্যাডমিন না হলে আটকে দেবে
    }
};
exports.admin = admin;
//# sourceMappingURL=authMiddleware.js.map