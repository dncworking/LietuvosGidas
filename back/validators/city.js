import { body } from "express-validator";

const validateCity = [
  body("name")
    .isString()
    .withMessage("title must be a string")
    .trim()
    .notEmpty()
    .withMessage("City name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("City name must be between 3 and 100 characters"),
];
export default validateCity;
