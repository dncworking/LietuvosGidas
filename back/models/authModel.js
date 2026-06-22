import { sql } from "../config/db.js";

export const getUserByEmailM = async (email) => {
  const data = await sql`
    SELECT * FROM users
    WHERE email = ${email}`;
  return data[0];
};

export const getUserByIDM = async (user_id) => {
  const data = await sql`
    SELECT * FROM users
    WHERE id = ${user_id}`;
  return data[0];
};

export const createUserM = async (userData) => {
  const { first_name, email, password, role } = userData;

  const data = await sql`
    INSERT INTO users (first_name, email, password, role)
    VALUES (${first_name},${email},${password}, ${role || "user"})
    RETURNING id, first_name, email,role`;
  return data[0];
};
