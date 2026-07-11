import express from "express";

import {
  createInterviewReport,
  getUserInterviewReports,
  getInterviewReportById,
} from "../controllers/interview.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { uploadResume } from "../middlewares/upload.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { createInterviewReportSchema } from "../validations/interview.validation.js";


const router = express.Router();

router.use(protect);

router.post(
  "/",
  uploadResume.single("resume"),
  validate(createInterviewReportSchema),
  createInterviewReport
);

router.get("/", getUserInterviewReports);

router.get("/:id", getInterviewReportById);

export default router;