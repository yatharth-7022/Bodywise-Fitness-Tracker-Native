import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllExercises = async (req: Request, res: Response) => {
  try {
    const exercises = await prisma.exercise.findMany();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exercises" });
  }
};

export const getExerciseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const exercise = await prisma.exercise.findUnique({
      where: { id: parseInt(id) },
    });
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    res.json(exercise);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exercise" });
  }
};

export const getExercisesByBodyPart = async (req: Request, res: Response) => {
  try {
    const { bodyPart } = req.params;
    const exercises = await prisma.exercise.findMany({
      where: { bodyPart },
    });
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exercises by body part" });
  }
};
