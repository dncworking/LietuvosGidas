import express from "express";
import { signup, login } from "../controllers/authController.js";
import validate from "../validators/validate.js";
import {
  loginValidator,
  signupValidator,
} from "../validators/authValidator.js";

const authRouter = express.Router();

authRouter.route("/signup").post(signupValidator, validate, signup);
authRouter.route("/login").post(loginValidator, validate, login);

export default authRouter;
