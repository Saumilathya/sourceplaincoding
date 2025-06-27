import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import http from "http";
import { connectDb } from "./db/db";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
import cors from "cors";
import courseRouter from "./routes/course.route";
dotenv.config();
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser
// app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/api/v1", userRouter);
app.use("/api/v1", courseRouter)

app.get("/text", (req: Request, res: Response) => {
  res.status(404).json({
    success: true,
    message: "Api is not working",
  });
});

server.listen(PORT, () => {
  connectDb();
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.use(ErrorMiddleware);
