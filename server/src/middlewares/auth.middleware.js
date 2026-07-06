import jwt from "jsonwebtoken";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import BlacklistedToken from "../models/blacklistedToken.model.js";
import { hashToken } from "../utils/token.utils.js";

const getTokenFromRequest = (req) => {
  const cookieToken = req.cookies?.accessToken;

  if (cookieToken) {
    return cookieToken;
  }

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  return null;
};

export const protect = asyncHandler(async (req, res, next) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    throw new ApiError(401, "Access token is missing. Please log in.");
  }

  const tokenHash = hashToken(token);

  const blacklistedToken = await BlacklistedToken.findOne({ tokenHash });

  if (blacklistedToken) {
    throw new ApiError(401, "Session expired. Please log in again.");
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decodedToken.id).select("-password");

  if (!user) {
    throw new ApiError(401, "User belonging to this token no longer exists");
  }

  if (!user.isEmailVerified) {
    throw new ApiError(403, "Please verify your email before continuing");
  }

  req.user = user;
  req.token = token;

  next();
});