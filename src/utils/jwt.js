import jwt from "jsonwebtoken";
import { insertSession } from "../models/session/SessionModel.js";
import { updateUser } from "../models/user/UserModel.js";

export const signAccessJWT = async (email) => {
  const token = jwt.sign({ email }, process.env.ACCESS_JWT_SECRET, {
    expiresIn: "15m",
  });

  const session = await insertSession({ token, associate: email });
  return session._id ? token : null;
};

export const verifyAccessJWT = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
    return decoded;
  } catch (error) {
    return error.message;
  }
};

// =====
export const signRefreshJWT = async (email) => {
  const refreshJWT = jwt.sign({ email }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: "30d",
  });

  const user = await updateUser({ email }, { refreshJWT });

  return user._id ? refreshJWT : null;
};

export const getTokens = async (email) => {
  return {
    accessJWT: await signAccessJWT(email),
    refreshJWT: await signRefreshJWT(email),
  };
};
