import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import authService from "../services/auth.service.js";
import { accessTokenCookieOptions } from "../utils/cookieOptions.js";

export const registerUser = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body, req.file);

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        result,
        "User registered successfully. Please verify your email."
      )
    );
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const result = await authService.verifyEmail(req.params.token);

  return res
    .status(200)
    .cookie("accessToken", result.token, accessTokenCookieOptions)
    .json(new ApiResponse(200, result, "Email verified successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body);

  return res
    .status(200)
    .cookie("accessToken", result.token, accessTokenCookieOptions)
    .json(new ApiResponse(200, result, "User logged in successfully"));
});

export const resendVerificationEmail = asyncHandler(async (req, res) => {
  await authService.resendVerificationEmail(req.body.email);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Verification email sent successfully"));
});

export const forgotPassword = asyncHandler(async (req, res) => {
  await authService.forgotPassword(req.body.email);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        null,
        "If an account exists with this email, a password reset link has been sent"
      )
    );
});

export const resetPassword = asyncHandler(async (req, res) => {
  const result = await authService.resetPassword(
    req.params.token,
    req.body.password
  );

  return res
    .status(200)
    .cookie("accessToken", result.token, accessTokenCookieOptions)
    .json(new ApiResponse(200, result, "Password reset successfully"));
});