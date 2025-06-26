require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
import http from "http";
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.get("/text", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Api is not working",
  });
});



server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
