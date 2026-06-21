import express from "express";

const app = express();

app.use(express.json());
//centralizes error handling middleware, if first functions arguments is error , express will know that this is error handling middleware
app.use((err, req, res, next) => {
  // const {statusCode, status, message} = err
  const statusCode = err.statusCode || 500;
  const errstatus = err.status || "error";
  const errmessage = err.message || "internal server error";

  res.status(statusCode).json({ status: errstatus, message: errmessage });
});

export default app;
