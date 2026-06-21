import postgres from "postgres";
import "dotenv/config";

export const sql = postgres({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
});

export const connection = async () => {
  try {
    await sql`SELECT 1 AS result`;
    console.log("Connection to database successful");
  } catch (error) {
    console.log("Connection to database failed", error);
    throw error;
  }
};
