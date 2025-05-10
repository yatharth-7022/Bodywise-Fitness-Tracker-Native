import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/authMiddleware";
import { Request, Response } from "express";
import logger from "../utils/logger";

const prisma = new PrismaClient();
export const logWeight = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { value, note, date } = req.body;
    const userId = req.userId!;

    const weight = await prisma.weight.create({
      data: {
        value: parseFloat(value),
        note,
        date: date ? new Date(date) : new Date(),
        userId,
      },
    });
    logger.info(
      `Weight logged for user ${userId}: ${weight.value}kg on ${weight.date}`
    );
    res.status(201).json({ message: "Weight logged successfully", weight });
  } catch (error) {
    logger.error("Weight logging error", error);
    res.status(500).json({ message: "Failed to log weight" });
  }
};
export const getWeightLogs = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId!;
    logger.info(`Fetching weights for user ${userId}`);

    const weights = await prisma.weight.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });

    logger.info(`Found ${weights.length} weights for user ${userId}`);
    res.status(200).json({ weights });
  } catch (error) {
    logger.error("Error fetching weights", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};
export const getRecentWeights = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId!;

    const weights = await prisma.weight.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      take: 7,
    });
    res.status(200).json({ weights });
  } catch (error) {
    logger.error("Get recent weights error:", error);
    res.status(500).json({ message: "Failed to get recent weights" });
  }
};
