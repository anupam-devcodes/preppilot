import express from "express";

import {
  registerUser,
  verifyEmail,
  loginUser,
  logoutUser,
  getCurrentUser,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";

import { uploadAvatar } from "../middlewares/upload.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  registerUserSchema,
  loginUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  resendVerificationEmailSchema,
} from "../validations/auth.validation.js";

const router = express.Router();

router.post(
  "/register",
  uploadAvatar.single("avatar"),
  validate(registerUserSchema),
  registerUser
);

router.post("/login", validate(loginUserSchema), loginUser);

router.post("/logout", protect, logoutUser);

router.get("/me", protect, getCurrentUser);

router.get("/verify-email/:token", verifyEmail);

router.post(
  "/resend-verification",
  validate(resendVerificationEmailSchema),
  resendVerificationEmail
);

router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  forgotPassword
);

router.patch(
  "/reset-password/:token",
  validate(resetPasswordSchema),
  resetPassword
);

export default router;