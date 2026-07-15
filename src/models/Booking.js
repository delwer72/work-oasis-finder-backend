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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// বুকিংয়ের ডেটাবেস স্কিমা
const bookingSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "User" // কে বুকিং করেছে
    },
    workspace: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "Workspace" // কোন স্পেসটি বুকিং করা হয়েছে
    },
    date: {
        type: String,
        required: true // বুকিংয়ের তারিখ
    },
    startTime: {
        type: String,
        required: true // কখন থেকে শুরু
    },
    endTime: {
        type: String,
        required: true // কখন শেষ হবে
    },
    totalPrice: {
        type: Number,
        required: true // মোট কত টাকা বিল হলো
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending" // বুকিংয়ের বর্তমান অবস্থা
    },
}, {
    timestamps: true,
});
const Booking = mongoose_1.default.model("Booking", bookingSchema);
exports.default = Booking;
//# sourceMappingURL=Booking.js.map