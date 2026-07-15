import type { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // এখানে .js যুক্ত করা হয়েছে

// JWT টোকেন তৈরি করার ফাংশন
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};

// @desc    নতুন ইউজার রেজিস্ট্রেশন করা
// @route   POST /api/users/register
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // চেক করা ইউজার আগে থেকেই আছে কি না
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists with this email" });
      return;
    }

    // নতুন ইউজার তৈরি করা
    const user = await User.create({
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
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
};

// @desc    ইউজার লগইন করা
// @route   POST /api/users/login
export const loginUser = async (req: Request, res: Response): Promise<void> => { // নাম loginUser করা হয়েছে
  try {
    const { email, password } = req.body;

    // ইমেইল দিয়ে ইউজার খোঁজা
    const user = await User.findOne({ email });

    // ইউজার থাকলে এবং পাসওয়ার্ড মিললে টোকেন দেওয়া
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
};