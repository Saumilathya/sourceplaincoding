import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncErrors";
import jwt, { JwtPayload } from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler";
import { updateAccessToken } from "../controllers/user.controller";
import userModel from "../models/user.model";
dotenv.config()

// authenticated user
export const isAutheticated = CatchAsyncError(
  async (req: any, res: Response, next: NextFunction) => {
    const access_token = req.headers["access-token"] as string;

    if (!access_token) {
      return next(
        new ErrorHandler("Please login to access this resource", 400)
      );
    }

    const decoded = await jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN as string
    ) as any;

    if (!decoded) {
      return next(new ErrorHandler("access token is not valid", 400));
    }
console.log(decoded);

    // check if the access token is expired
    if (decoded.exp && decoded.exp <= Date.now() / 1000) {
      try {
        await updateAccessToken(req, res, next);
      } catch (error) {
        return next(error);
      }
    } else {
      const user = await userModel.findById(decoded.id);

      if (!user) {
        return next(
          new ErrorHandler("Please login to access this resource", 400)
        );
      }

      req.user = user;

      next();
    }
  }
);

// validate user role
export const authorizeRoles = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler(
          `Role: ${req.user?.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
