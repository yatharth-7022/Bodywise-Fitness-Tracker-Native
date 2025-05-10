import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllRoutines = async (req: Request, res: Response) => {
  try {
    const includeExercises = req.query.includeExercises !== "false";

    const routines = await prisma.routine.findMany({
      include: includeExercises
        ? {
            exercises: {
              include: {
                exercise: true,
              },
            },
          }
        : undefined,
    });
    res.json(routines);
  } catch (error) {
    res.status(500).json({ message: "Error fetching routines" });
  }
};

export const getRoutineById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const includeExercises = req.query.includeExercises !== "false";

    const routine = await prisma.routine.findUnique({
      where: { id: parseInt(id) },
      include: includeExercises
        ? {
            exercises: {
              include: {
                exercise: true,
              },
            },
          }
        : undefined,
    });
    if (!routine) {
      return res.status(404).json({ message: "Routine not found" });
    }
    res.json(routine);
  } catch (error) {
    res.status(500).json({ message: "Error fetching routine" });
  }
};

export const getDefaultRoutines = async (req: Request, res: Response) => {
  try {
    const includeExercises = req.query.includeExercises !== "false";

    const routines = await prisma.routine.findMany({
      where: { isDefault: true },
      include: includeExercises
        ? {
            exercises: {
              include: {
                exercise: true,
              },
            },
          }
        : undefined,
    });

    res.json(routines);
  } catch (error) {
    console.error("Error in getDefaultRoutines:", error);
    res.status(500).json({
      message: "Error fetching default routines",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
