import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/routes";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./utils/logger";
import weightRoutes from "./routes/routes";
import exerciseRoutes from "./routes/routes";
import routineRoutes from "./routes/routes";
import path from "path";
import cookieParser from "cookie-parser";
import setup from "./setup";

dotenv.config();

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [
  "http://localhost:5173",
  "http://localhost:19000", // Expo development server
  "http://localhost:19006", // Expo web
  "exp://", // Expo Go app
  "https://expo.dev", // Expo production
];

app.use(
  cors({
    origin: function (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void
    ) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Allow all origins in development
      if (process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }

      // In production, check against allowed origins
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser());
app.use(
  morgan("combined", {
    stream: { write: (message: string) => logger.info(message.trim()) },
  })
);

// Serve static files from public directory
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/weight", weightRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/routines", routineRoutes);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    logger.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
  }
);

const PORT = parseInt(process.env.PORT || "5000", 10);

// Run database setup in production
if (process.env.NODE_ENV === "production") {
  setup()
    .then(() => {
      logger.info("Database setup completed, starting server...");
    })
    .catch((error) => {
      logger.error("Failed to set up database:", error);
      // Continue starting the server even if setup fails
    });
}

app.listen(PORT, "0.0.0.0", () => {
  logger.info(`Server is running on port ${PORT}`);
});
