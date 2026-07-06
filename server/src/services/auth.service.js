import crypto from "crypto";

import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import deleteLocalFile from "../utils/deleteLocalFile.js";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
} from "./email.service.js";

const getApiBaseUrl = () => {
  return process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
};

const registerUser = async (userData, avatarFile) => {
  const { fullName, email, password } = userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    if (avatarFile?.path) {
      deleteLocalFile(avatarFile.path);
    }

    throw new ApiError(409, "User already exists with this email");
  }

  const avatar = avatarFile
    ? {
        url: `/uploads/avatars/${avatarFile.filename}`,
        publicId: "",
      }
    : {
        url: "",
        publicId: "",
      };

  const user = new User({
    fullName,
    email,
    password,
    avatar,
  });

  const verificationToken = user.generateEmailVerificationToken();

  await user.save();

  const verificationUrl = `${getApiBaseUrl()}/api/v1/auth/verify-email/${verificationToken}`;

  await sendVerificationEmail({
    email: user.email,
    fullName: user.fullName,
    verificationUrl,
  });

  const createdUser = await User.findById(user._id).select("-password");

  return {
    user: createdUser,
  };
};

const verifyEmail = async (token) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationTokenExpires: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    throw new ApiError(400, "Invalid or expired email verification token");
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationTokenExpires = undefined;

  await user.save({ validateBeforeSave: false });

  const authToken = user.generateAuthToken();

  const verifiedUser = await User.findById(user._id).select("-password");

  return {
    user: verifiedUser,
    token: authToken,
  };
};

const resendVerificationEmail = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.isEmailVerified) {
    throw new ApiError(400, "Email is already verified");
  }

  const verificationToken = user.generateEmailVerificationToken();

  await user.save({ validateBeforeSave: false });

  const verificationUrl = `${getApiBaseUrl()}/api/v1/auth/verify-email/${verificationToken}`;

  await sendVerificationEmail({
    email: user.email,
    fullName: user.fullName,
    verificationUrl,
  });

  return true;
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    return true;
  }

  const resetToken = user.generatePasswordResetToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${getApiBaseUrl()}/api/v1/auth/reset-password/${resetToken}`;

  await sendPasswordResetEmail({
    email: user.email,
    fullName: user.fullName,
    resetUrl,
  });

  return true;
};

const resetPassword = async (token, password) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpires: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    throw new ApiError(400, "Invalid or expired password reset token");
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;

  await user.save();

  const authToken = user.generateAuthToken();

  return {
    token: authToken,
  };
};

const loginUser = async (credentials) => {
  const { email, password } = credentials;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (!user.isEmailVerified) {
    throw new ApiError(403, "Please verify your email before logging in");
  }

  const token = user.generateAuthToken();

  const loggedInUser = await User.findById(user._id).select("-password");

  return {
    user: loggedInUser,
    token,
  };
};

export default {
  registerUser,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
  loginUser,
};