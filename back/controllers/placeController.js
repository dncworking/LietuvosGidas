import {
  getAllPlacesM,
  getPlaceByIDM,
  postPlaceM,
  deletePlaceM,
  updatePlaceM,
} from "../models/placeModel.js";
import AppError from "../utils/appError.js";

// 1. Gauti visas vietas (priima req.query filtrams, bet veikia ir be jų)
export const getAllPlaces = async (req, res, next) => {
  try {
    // req.query automatiškai paims filtrus, jei jie bus URL (pvz., ?city_id=1)
    // Jei filtrų nėra, req.query bus tuščias objektas {}, ir modelis grąžins viską
    const places = await getAllPlacesM(req.query);

    res.status(200).json({
      status: "success",
      data: places,
    });
  } catch (error) {
    next(error);
  }
};

// 2. Gauti lankytiną vietą pagal ID
export const getPlaceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const place = await getPlaceByIDM(id);

    if (!place) {
      throw new AppError("No place found with that ID", 404);
    }

    res.status(200).json({
      status: "success",
      data: place,
    });
  } catch (error) {
    next(error);
  }
};

// 3. Sukurti naują lankytiną vietą
export const createPlace = async (req, res, next) => {
  try {
    const placeData = req.body;

    const newPlace = await postPlaceM(placeData);

    res.status(201).json({
      status: "success",
      data: newPlace,
    });
  } catch (error) {
    // Apsauga: jei bandoma pridėti vietą prie neegzistuojančio miesto ID
    if (error.code === "23503") {
      return next(new AppError("Provided city_id does not exist", 400));
    }
    next(error);
  }
};

// 4. Atnaujinti lankytiną vietą
export const updatePlace = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedPlace = await updatePlaceM(id, req.body);

    if (!updatedPlace) {
      throw new AppError("Place not found", 404);
    }

    res.status(200).json({
      status: "success",
      data: updatedPlace,
    });
  } catch (error) {
    // Ta pati apsauga nuo blogo miesto ID redaguojant
    if (error.code === "23503") {
      return next(new AppError("Provided city_id does not exist", 400));
    }
    next(error);
  }
};

// 5. Ištrinti lankytiną vietą
export const deletePlace = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPlace = await deletePlaceM(id);

    if (!deletedPlace) {
      throw new AppError("Invalid place ID", 404);
    }

    res.status(200).json({
      status: "success",
      message: "Place was successfully deleted",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
