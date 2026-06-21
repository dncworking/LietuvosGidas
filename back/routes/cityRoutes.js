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

const cityRouter = express.Router();

// Kelias: /api/cities
cityRouter
  .route("/")
  .get(getAllCities)
  .post(validateCity, validate, createCity);

// Kelias: /api/cities/:id
cityRouter
  .route("/:id")
  .get(validateID, validate, getCityById)
  .put(validateID, validateCity, validate, updateCity)
  .delete(validateID, validate, deleteCity);

export default cityRouter;
