import express from "express";
import cors from "cors";
import cityRouter from "./routes/cityRoutes.js";
import placeRouter from "./routes/placeRoutes.js";
import authRouter from "./routes/authRoutes.js";

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api/v1/cities", cityRouter);
app.use("/api/v1/places", placeRouter);
app.use("/api/v1/auth", authRouter);
//centralizes error handling middleware, if first functions arguments is error , express will know that this is error handling middleware
app.use((err, req, res, next) => {
  // const {statusCode, status, message} = err
  const statusCode = err.statusCode || 500;
  const errstatus = err.status || "error";
  const errmessage = err.message || "internal server error";

  res.status(statusCode).json({ status: errstatus, message: errmessage });
});

export default app;
