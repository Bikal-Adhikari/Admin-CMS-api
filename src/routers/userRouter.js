import express from "express";
import { newUserValidation } from "../middlewares/joiValidation.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { signAccessJWT, signRefreshJWT } from "../utils/jwt.js";
import {
  createNewUser,
  getAUser,
  updateUser,
} from "../models/user/userModel.js";
import { deleteSession, insertToken } from "../models/session/SessionModel.js";
import { v4 as uuidv4 } from "uuid";
import { emailVerificationMail } from "../services/email/nodemailer.js";
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
      const token = uuidv4();
      const obj = {
        token,
        associate: user.email,
      };

      const result = await insertToken(obj);
      //process for sending email
      if (result?._id) {
        emailVerificationMail({
          email: user.email,
          fName: user.fName,
          url:
            process.env.FE_ROOT_URL + `/verify-user?c=${token}&e=${user.email}`,
        });
        return res.json({
          status: "success",
          message:
            "We have sent you an email with instructions to verify your account. Please check email/junk to verify your account",
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

// user Verification
router.post("/user-verification", async (req, res, next) => {
  try {
    const { c, e } = req.body;

    // delete session data
    const session = await deleteSession({
      token: c,
      associate: e,
    });

    if (session?._id) {
      // update user table
      const result = await updateUser(
        { email: e },
        { status: "active", isEmailVerified: true }
      );
      if (result?._id) {
        res.json({
          status: "success",
          message: "Your account has been verified. You may sign in now ",
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
