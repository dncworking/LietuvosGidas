import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUserM, getUserByEmailM } from "../models/authModel.js";
import AppError from "../utils/appError.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
export const signup = async (req, res, next) => {
  try {
    const { first_name, email, password, role } = req.body;
    const existingUser = await getUserByEmailM(email);
    if (existingUser) {
      throw new AppError("Email alredy in use", 400);
    }
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await createUserM({
      first_name,
      email,
      password: hashedPassword,
      role,
    });

    const token = signToken(newUser.id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Patikriname, ar išvis atsiuntė email ir password
    if (!email || !password) {
      throw new AppError("Please provide email and password", 400);
    }

    // 2. Ieškome vartotojo duomenų bazėje
    const user = await getUserByEmailM(email);

    // 3. Patikriname, ar vartotojas egzistuoja ir ar slaptažodis teisingas
    // bcrypt.compare palygina atsiųstą tekstą su užšifruotu hash iš DB
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError("Incorrect email or password", 401); // 401 Unauthorized
    }

    // 4. Jei viskas gerai, generuojame ir siunčiame žetoną
    const token = signToken(user.id);

    // Saugumo dėlei ištriname slaptažodį iš objekto prieš išsiunčiant atsakymą
    delete user.password;

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// 3. MARŠRUTŲ APSAUGA (Protect Middleware)
// ==========================================
export const protect = async (req, res, next) => {
  try {
    let token;

    // 1. Tikriname, ar užklausa turi Authorization headerį ir ar jis prasideda "Bearer"
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Pasiimame patį žetoną (iškerpame tekstą po tarpelio)
      token = req.headers.authorization.split(" ")[1];
    }

    // Jei žetono nėra – metam klaidą
    if (!token) {
      throw new AppError(
        "You are not logged in! Please log in to get access.",
        401,
      );
    }

    // 2. Žetono verifikacija (patikrinam, ar jis tikras ir nepadirbtas)
    // jwt.verify grąžina objektą su duomenimis, kuriuos užkodavome (šiuo atveju – vartotojo id)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Saugumo sumetimais patikriname, ar vartotojas vis dar egzistuoja DB
    // (Pvz., jei vartotojas buvo ištrintas iš DB, bet jo žetonas dar galioja)
    // Čia gali panaudoti savo getUserById modelio funkciją. Pvz., jei tavo modelyje ji vadinasi getUserByIdM:
    // const currentUser = await getUserByIdM(decoded.id);
    // if (!currentUser) {
    //   throw new AppError("The user belonging to this token no longer exists.", 401);
    // }

    // 4. Jei viskas gerai, prisegame vartotojo ID prie req objekto
    // Tai leis kitiems kontroleriams žinoti, KAS atliko užklausą
    req.user = { id: decoded.id };

    next(); // Praleidžiame prie kito kontrolerio
  } catch (error) {
    // Jei žetonas suklastotas arba pasibaigęs jo laikas, jwt.verify išmes klaidą.
    // Sugaudome tai ir paverčiame į tvarkingą 401 klaidą:
    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid token. Please log in again!", 401));
    }
    if (error.name === "TokenExpiredError") {
      return next(
        new AppError("Your token has expired! Please log in again.", 401),
      );
    }

    next(error);
  }
};
