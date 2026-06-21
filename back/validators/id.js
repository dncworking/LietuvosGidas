import { param } from "express-validator";

const validateID = [
  param("id").isInt({ min: 1, max: 1000 }).withMessage("Invalid ID"),
];
export default validateID;
