import { findToken } from "../models/session/SessionModel.js";
import { getAUser } from "../models/user/userModel.js";
import { verifyAccessJWT, verifyRefreshJWT } from "../utils/jwt.js";

export const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const decoded = verifyAccessJWT(authorization);
    let message = "";
    if (decoded?.email) {
      const tokenObj = await findToken({
        token: authorization,
        associate: decoded.email,
      });

      if (tokenObj?._id) {
        const user = await getUserByEmail(decoded.email);
        if (user?._id && user?.isEmailVerified && user?.status === "active") {
          user.password = undefined;
          user.__v = undefined;
          req.userInfo = user;
          return next();
        }
        if (user?.status === "inactive") {
          message = "Your account is not active, contact admin";
        }
        if (!user?.isEmailVerified) {
          message = "User not Verified, please check your email and verify";
        }
      }
    }

    const error = {
      status: 403,
      message: message || decoded,
    };
    next(error);
  } catch (error) {
    next(error);
  }
};

export const isAdmin = (req, res, next) => {
  req.userInfo.role === "admin"
    ? next()
    : next({ status: 403, message: "Unauthorized" });
};

export const jwtAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const decoded = verifyRefreshJWT(authorization);

    if (decoded?.email) {
      const user = await getAUser(decoded.email);
      if (user?._id && user.refreshJWT === authorization) {
        user.password = undefined;
        req.userInfo = user;
        return next();
      }
    }

    const error = {
      status: 403,
      message: decoded,
    };
    next(error);
  } catch (error) {
    next(error);
  }
};
