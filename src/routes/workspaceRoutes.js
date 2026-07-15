"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workspaceController_1 = require("../controllers/workspaceController");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // সিকিউরিটি গার্ড
const router = express_1.default.Router();
// GET রিকোয়েস্ট পাবলিক, কিন্তু POST রিকোয়েস্টে protect বসানো হয়েছে (লগইন ছাড়া স্পেস যোগ করা যাবে না)
router.route("/").get(workspaceController_1.getWorkspaces).post(authMiddleware_1.protect, workspaceController_1.createWorkspace);
// নির্দিষ্ট আইডি দিয়ে স্পেস দেখা (পাবলিক)
router.route("/:id").get(workspaceController_1.getWorkspaceById);
// স্পেস ডিলিট করা (টেস্ট করার জন্য সাময়িকভাবে protect সরিয়ে দেওয়া হলো)
router.delete("/:id", workspaceController_1.deleteWorkspace);
exports.default = router;
//# sourceMappingURL=workspaceRoutes.js.map