import express from "express";
import { newUserValidation } from "../middlewares/joiValidation.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { signAccessJWT, signRefreshJWT } from "../utils/jwt.js";
import { createNewUser, getAUser } from "../models/user/userModel.js";
import { insertToken } from "../models/session/SessionModel.js";
import { v4 as uuidv4 } from "uuid";
const router = express.Router();

router.all("/", (req, res, next) => {
  console.log("all router");
  next();
});

router.get("/", (req, res, next) => {
  try {
    res.json({ status: "success", message: "Todo...." });
  } catch (error) {
    next(error);
  }
});

// create new admin

router.post("/", newUserValidation, async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);
    const user = await createNewUser(req.body);

    // create unique url
    if (user?._id) {
      const obj = {
        token: uuidv4(),
        associate: user.email,
      };

      const result = await insertToken(obj);
      //process for sending email
      if (result?._id) {
        return res.json({
          status: "success",
          message:
            "We have sen you an email with instructions to verify your account. Please check email/junk to verify your account",
        });
      }
    }

    res.json({
      status: "failure",
      message: "Unable to create an account, contact administration",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key")) {
      error.message =
        "Another user already have this email, change your email and try again";
      error.status = 200;
    }
    next(error);
  }
});

//login

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email.includes("@") && !password) {
      throw new Error("Invalid login details");
    }
    // find user by email
    const user = await getAUser(email);
    if (user?._id) {
      // verify the password
      const isPasswordMatched = comparePassword(password, user.password);

      if (isPasswordMatched) {
        //user authentication
        //create token, and return

        return res.json({
          status: "success",
          message: "user authenticated",
          tokens: {
            accessJWT: signAccessJWT({ email }),
            refreshJWT: signRefreshJWT(email),
          },
        });
      }
    }
    res.json({
      status: "error",
      message: "Invalid login details",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
