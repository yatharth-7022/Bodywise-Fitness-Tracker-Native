import { Router, Request, Response, NextFunction } from "express";
import {
  signup,
  login,
  getUser,
  refresh,
  logout,
  uploadProfilePicture,
  getProfilePicture,
} from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

import { authRateLimiter } from "../middleware/rateLimiter";
import {
  handleValidationErrors,
  validateLogin,
  validateSignup,
  validateWeightLog,
} from "../middleware/validationMiddleware";
import {
  getRecentWeights,
  getWeightLogs,
  logWeight,
} from "../controllers/weightController";
import {
  getAllExercises,
  getExerciseById,
  getExercisesByBodyPart,
} from "../controllers/exerciseController";
import {
  getAllRoutines,
  getDefaultRoutines,
  getRoutineById,
} from "../controllers/routineController";
import { upload } from "../utils/fileUpload";

const router = Router();

router.post("/signup", validateSignup, handleValidationErrors, signup);
router.post("/login", validateLogin, handleValidationErrors, login);

router.use(authRateLimiter);
router.use(protect);

// Protected routes
router.get("/user", getUser);
router.post("/", validateWeightLog, handleValidationErrors, logWeight);
router.get("/", getWeightLogs);
router.get("/recent-weights", getRecentWeights);
router.get("/exercises", getAllExercises);
router.get("/exercises/:id", getExerciseById);
router.get("/exercises/:bodyPart", getExercisesByBodyPart);
router.get("/routines", getAllRoutines);
router.get("/routines/default", getDefaultRoutines);
router.get("/routines/:id", getRoutineById);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.post(
  "/upload-profile-picture",
  upload.single("profilePicture"),
  uploadProfilePicture
);
router.get("/profile", getProfilePicture);

export default router;
