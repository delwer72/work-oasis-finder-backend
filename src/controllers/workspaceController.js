"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkspace = exports.deleteWorkspace = exports.getWorkspaceById = exports.getWorkspaces = void 0;
const express_1 = require("express");
const Workspace_1 = __importDefault(require("../models/Workspace"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
// @desc    সবগুলো স্পেস একসাথে দেখা
// @route   GET /api/workspaces
const getWorkspaces = async (req, res) => {
    try {
        const workspaces = await Workspace_1.default.find({});
        res.json(workspaces);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.getWorkspaces = getWorkspaces;
// @desc    নির্দিষ্ট একটি স্পেসের বিস্তারিত দেখা
// @route   GET /api/workspaces/:id
const getWorkspaceById = async (req, res) => {
    try {
        const workspace = await Workspace_1.default.findById(req.params.id);
        if (workspace) {
            res.json(workspace);
        }
        else {
            res.status(404).json({ message: "Workspace not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.getWorkspaceById = getWorkspaceById;
// @desc    Delete a workspace
// @route   DELETE /api/workspaces/:id
const deleteWorkspace = async (req, res) => {
    try {
        const deletedWorkspace = await Workspace_1.default.findByIdAndDelete(req.params.id);
        if (!deletedWorkspace) {
            res.status(404).json({ message: "Workspace not found" });
            return;
        }
        res.status(200).json({ message: "Workspace deleted successfully!" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.deleteWorkspace = deleteWorkspace;
// @desc    নতুন স্পেস তৈরি করা (শুধুমাত্র লগইন করা ইউজার পারবে)
// @route   POST /api/workspaces
const createWorkspace = async (req, res) => {
    try {
        // ফ্রন্টএন্ড থেকে আসা ডেটাগুলো রিসিভ করা হচ্ছে
        const { title, shortDescription, description, price, location, city, image, gallery, amenities } = req.body;
        const workspace = new Workspace_1.default({
            title,
            shortDescription,
            description,
            price,
            location,
            city,
            image,
            gallery,
            amenities,
            user: req.user?._id, // Auth middleware থেকে ইউজারের আইডি
        });
        const createdWorkspace = await workspace.save();
        res.status(201).json(createdWorkspace);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.createWorkspace = createWorkspace;
//# sourceMappingURL=workspaceController.js.map