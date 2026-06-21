import { sql } from "../config/db.js";

export const getAllCitiesM = async () => {
  const data = await sql`
    SELECT * FROM cities`;
  return data;
};

export const getCitiesByIDM = async (cityId) => {
  const data = await sql`
    SELECT * FROM cities
    WHERE id = ${cityId}`;
  return data[0];
};

export const postCitieM = async (cityData) => {
  const { name } = cityData;
  const data = await sql`
    INSERT INTO cities
    (name)
    VALUES(${name})
    RETURNING *`;
  return data[0];
};

export const deleteCitietM = async (cityId) => {
  const data = await sql`
    DELETE FROM cities
    WHERE id = ${cityId}
    RETURNING *`;
  return data[0];
};

export const updateCitieM = async (cityId, updateData) => {
  const { name } = updateData;
  const data = await sql`
    UPDATE cities
   SET name = ${name}
   WHERE id = ${cityId}
    RETURNING *`;
  return data[0];
};
