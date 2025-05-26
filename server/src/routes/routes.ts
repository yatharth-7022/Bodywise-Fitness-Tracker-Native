import { Router, Request, Response, NextFunction } from "express";
import {
  signup,
  login,
  getUser,
  refresh,
  refreshWithToken,
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

// Public routes (no authentication required)
router.post("/signup", validateSignup, handleValidationErrors, signup);
router.post("/login", validateLogin, handleValidationErrors, login);
router.post("/refresh", refresh); // Cookie-based refresh (for web)
router.post("/refresh-token", refreshWithToken); // Token-based refresh (for mobile)

// Apply rate limiting and protection to all routes below
router.use(authRateLimiter);
router.use(protect);

// Protected routes (authentication required)
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
router.post("/logout", logout);
router.post(
  "/upload-profile-picture",
  upload.single("profilePicture"),
  uploadProfilePicture
);
router.get("/profile", getProfilePicture);

export default router;
