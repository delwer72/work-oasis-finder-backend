import type { Request, Response } from 'express';
import { AuthRequest } from "../middlewares/authMiddleware";
export declare const getWorkspaces: (req: Request, res: Response) => Promise<void>;
export declare const getWorkspaceById: (req: Request, res: Response) => Promise<void>;
export declare const deleteWorkspace: (req: Request, res: Response) => Promise<void>;
export declare const createWorkspace: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=workspaceController.d.ts.map