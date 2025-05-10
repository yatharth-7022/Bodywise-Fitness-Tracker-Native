import { RateLimiterMemory } from "rate-limiter-flexible";
import { Request, Response, NextFunction } from "express";

const rateLimiter = new RateLimiterMemory({
  points: 20, // Increased from 5 to 20 requests
  duration: 60, // Per 60 seconds
});

export const authRateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip = req.ip || "unknown";
  try {
    await rateLimiter.consume(ip);
    next();
  } catch (error) {
    res
      .status(429)
      .json({ message: "Too many requests, please try again later" });
  }
};
