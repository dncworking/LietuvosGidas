import { sql } from "../config/db.js";

// 1. Gauti visas vietas su filtravimu
export const getAllPlacesM = async (filters) => {
  const { city_id, type, is_free, min_rating, search } = filters;

  // Pradedame nuo bazinės užklausos. WHERE true reikalingas tam,
  // kad vėliau galėtume saugiai lipdyti "AND ..." sąlygas
  let query = sql`SELECT * FROM places WHERE true`;

  // Jei atkeliavo miesto ID filtras
  if (city_id) {
    query = sql`${query} AND city_id = ${city_id}`;
  }

  // Jei atkeliavo tipo filtras
  if (type) {
    query = sql`${query} AND type = ${type}`;
  }

  // Jei atkeliavo nemokamų/mokamų vietų filtras
  if (is_free !== undefined && is_free !== "") {
    const freeBool = is_free === "true" || is_free === true;
    query = sql`${query} AND is_free = ${freeBool}`;
  }

  // Jei atkeliavo minimalaus reitingo filtras
  if (min_rating) {
    query = sql`${query} AND rating >= ${parseFloat(min_rating)}`;
  }

  // Jei atkeliavo paieškos filtras
  if (search) {
    const searchPattern = `%${search}%`;
    query = sql`${query} AND name ILIKE ${searchPattern}`;
  }

  // Pabaigoje pridedame rūšiavimą
  query = sql`${query} ORDER BY id ASC`;

  // Įvykdomo galutinę sugeneruotą užklausą
  const data = await query;
  return data;
};

// 2. Gauti vieną vietą pagal ID
export const getPlaceByIDM = async (placeId) => {
  const data = await sql`
    SELECT * FROM places
    WHERE id = ${placeId}`;
  return data[0];
};

// 3. Sukurti naują lankytiną vietą
export const postPlaceM = async (placeData) => {
  const {
    name,
    type,
    description,
    image_url,
    address,
    rating,
    is_free,
    city_id,
  } = placeData;
  const data = await sql`
    INSERT INTO places
    (name, type, description, image_url, address, rating, is_free, city_id)
    VALUES (${name}, ${type}, ${description}, ${image_url}, ${address}, ${rating}, ${is_free}, ${city_id})
    RETURNING *`;
  return data[0];
};

// 4. Ištrinti lankytiną vietą
export const deletePlaceM = async (placeId) => {
  const data = await sql`
    DELETE FROM places
    WHERE id = ${placeId}
    RETURNING *`;
  return data[0];
};

// 5. Atnaujinti lankytiną vietą
export const updatePlaceM = async (placeId, updateData) => {
  const {
    name,
    type,
    description,
    image_url,
    address,
    rating,
    is_free,
    city_id,
  } = updateData;
  const data = await sql`
    UPDATE places
    SET name = ${name}, type = ${type}, description = ${description}, 
        image_url = ${image_url}, address = ${address}, rating = ${rating}, 
        is_free = ${is_free}, city_id = ${city_id}
    WHERE id = ${placeId}
    RETURNING *`;
  return data[0];
};
