import { validationResult } from "express-validator";
import AppError from "../utils/appError.js";

const validate = (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMsg = errors.array()[0].msg;
      throw new AppError(errorMsg, 400);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default validate;
