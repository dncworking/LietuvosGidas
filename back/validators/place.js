import { body } from "express-validator";

const validatePlace = [
  // 1. Pavadinimas (String, privalomas, 3-150 simbolių)
  body("name")
    .isString()
    .withMessage("Place name must be a string")
    .trim()
    .notEmpty()
    .withMessage("Place name is required")
    .isLength({ min: 3, max: 150 })
    .withMessage("Place name must be between 3 and 150 characters"),

  // 2. Tipas (String, privalomas, pvz., muziejus, parkas)
  body("type")
    .isString()
    .withMessage("Type must be a string")
    .trim()
    .notEmpty()
    .withMessage("Type is required"),

  // 3. Aprašymas (String, privalomas)
  body("description")
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  // 4. Nuotraukos URL (String, privalomas, turi būti URL formatas)
  body("image_url")
    .isString()
    .withMessage("Image URL must be a string")
    .trim()
    .notEmpty()
    .withMessage("Image URL is required")
    .isURL()
    .withMessage("Image URL must be a valid URL address"),

  // 5. Adresas (String, privalomas)
  body("address")
    .isString()
    .withMessage("Address must be a string")
    .trim()
    .notEmpty()
    .withMessage("Address is required"),

  // 6. Reitingas (Float/Skaičius nuo 1 iki 5, privalomas)
  body("rating")
    .optional({ checkFalsy: true }) // Jei lauko nėra arba jis tuščias - praleidžia toliau
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be a number between 1 and 5"),

  // 7. Ar nemokama (Boolean: true/false, privalomas)
  body("is_free")
    .isBoolean()
    .withMessage("is_free must be a boolean value (true or false)"),

  // 8. Miesto ID (Sveikas skaičius, privalomas)
  body("city_id").isInt({ min: 1 }).withMessage("Valid City ID is required"),
];

export default validatePlace;
