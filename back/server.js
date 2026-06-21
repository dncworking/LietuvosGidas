import { connection } from "./config/db.js";
import app from "./app.js";

const PORT = process.env.PORT;

connection();
app.listen(PORT, () => {
  console.log(`Serveris veikia ant porto: ${PORT}`);
});
