// import express from "express";
// import { registerUser, authUser } from "../controllers/authController";

// const router = express.Router();

// // রাউটগুলো ডিফাইন করা
// router.post("/register", registerUser);
// router.post("/login", authUser);

// export default router;
import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;