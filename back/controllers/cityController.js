import {
  getAllCitiesM,
  getCitiesByIDM,
  postCitieM,
  deleteCitietM,
  updateCitieM,
} from "../models/cityModel.js";
import AppError from "../utils/appError.js";

export const getAllCities = async (req, res, next) => {
  try {
    const cities = await getAllCitiesM();

    res.status(200).json({
      status: "success",
      data: cities,
    });
  } catch (error) {
    next(error);
  }
};

export const getCityById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const city = await getCitiesByIDM(id);

  
    if (!city) {
      throw new AppError("No city found with that ID", 404);
    }

    res.status(200).json({
      status: "success",
      data: city,
    });
  } catch (error) {
    next(error);
  }
};

export const createCity = async (req, res, next) => {
  try {
    const cityData = req.body;

    if (!cityData.name) {
      throw new AppError("City name is required", 400);
    }

    const newCity = await postCitieM(cityData);

    res.status(201).json({
      status: "success",
      data: newCity,
    });
  } catch (error) {
    // Apsauga nuo vienodų miestų pavadinimų
    if (error.code === "23505") {
      return next(new AppError("City with this name already exists", 400));
    }
    next(error);
  }
};

export const updateCity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedCity = await updateCitieM(id, req.body);

    if (!updatedCity) {
      throw new AppError("City not found", 404);
    }

    res.status(200).json({
      status: "success",
      data: updatedCity,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCity = await deleteCitietM(id);

    if (!deletedCity) {
      throw new AppError("Invalid city ID", 404);
    }

    res.status(200).json({
      status: "success",
      message: "City and all its related places were deleted",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
