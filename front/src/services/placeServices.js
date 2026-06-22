import api from "./api";

export const getPlaces = async () => {
  try {
    const response = await api.get("/places");
    return response.data.data; // Grąžina vietovių masyvą iš DB
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Nepavyko užkrauti vietovių.",
      { cause: error },
    );
  }
};

export const createPlace = async (placeData) => {
  try {
    const response = await api.post("/places", placeData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Nepavyko pridėti naujos vietovės.",
      { cause: error },
    );
  }
};
export const deletePlace = async (id) => {
  try {
    const response = await api.delete(`/places/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Nepavyko ištrinti vietovės.",
      { cause: error },
    );
  }
};
// Gauti vieną vietą pagal ID (kad užpildytume formą)
export const getPlaceById = async (id) => {
  try {
    const response = await api.get(`/places/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Nepavyko gauti vietovės duomenų.",
      { cause: error },
    );
  }
};

// Atnaujinti vietą (išsiųsti pakeitimus)
export const updatePlace = async (id, placeData) => {
  try {
    const response = await api.put(`/places/${id}`, placeData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Nepavyko atnaujinti vietovės.",
      { cause: error },
    );
  }
};
