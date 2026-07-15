import type { Request, Response } from 'express';
import { AuthRequest } from "../middlewares/authMiddleware";
export declare const createBooking: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getMyBookings: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getAllBookings: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateBookingStatus: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteBooking: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=bookingController.d.ts.map