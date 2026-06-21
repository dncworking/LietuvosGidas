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

const placeRouter = express.Router();

// Kelias: /api/places
placeRouter
  .route("/")
  .get(getAllPlaces)
  .post(validatePlace, validate, createPlace);

// Kelias: /api/places/:id
placeRouter
  .route("/:id")
  .get(validateID, validate, getPlaceById)
  .put(validateID, validatePlace, validate, updatePlace)
  .delete(validateID, validate, deletePlace);

export default placeRouter;
