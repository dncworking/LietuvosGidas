import express from "express";
import {
  getAllCities,
  getCityById,
  createCity,
  updateCity,
  deleteCity,
} from "../controllers/cityController.js";
import validateCity from "../validators/city.js";
import validate from "../validators/validate.js";
import validateID from "../validators/id.js";
import { protect } from "../controllers/authController.js";

const cityRouter = express.Router();

// Kelias: /api/cities
cityRouter
  .route("/")
  .get(getAllCities)
  .post(protect, validateCity, validate, createCity);

// Kelias: /api/cities/:id
cityRouter
  .route("/:id")
  .get(validateID, validate, getCityById)
  .put(protect, validateID, validateCity, validate, updateCity)
  .delete(protect, validateID, validate, deleteCity);

export default cityRouter;
