import express from "express";
import {
  getAllPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
} from "../controllers/placeController.js";
import validatePlace from "../validators/place.js";
import validate from "../validators/validate.js";
import validateID from "../validators/id.js";
import { protect } from "../controllers/authController.js";

const placeRouter = express.Router();

// Kelias: /api/places
placeRouter
  .route("/")
  .get(getAllPlaces)
  .post(protect, validatePlace, validate, createPlace);

// Kelias: /api/places/:id
placeRouter
  .route("/:id")
  .get(validateID, validate, getPlaceById)
  .put(protect, validateID, validatePlace, validate, updatePlace)
  .delete(protect, validateID, validate, deletePlace);

export default placeRouter;
