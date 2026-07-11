import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import interviewService from "../services/interview.service.js";

export const createInterviewReport = asyncHandler(async (req, res) => {
  const report = await interviewService.createInterviewReport({
    userId: req.user._id,
    reportData: req.body,
    resumeFile: req.file,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        report,
        "Interview report created successfully"
      )
    );
});

export const getUserInterviewReports = asyncHandler(async (req, res) => {
  const reports = await interviewService.getUserInterviewReports(req.user._id);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        reports,
        "Interview reports fetched successfully"
      )
    );
});

export const getInterviewReportById = asyncHandler(async (req, res) => {
  const report = await interviewService.getInterviewReportById({
    userId: req.user._id,
    reportId: req.params.id,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        report,
        "Interview report fetched successfully"
      )
    );
});