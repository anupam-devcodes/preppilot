import InterviewReport from "../models/interviewReport.model.js";
import ApiError from "../utils/ApiError.js";
import deleteLocalFile from "../utils/deleteLocalFile.js";

const createInterviewReport = async ({ userId, reportData, resumeFile }) => {
  if (!resumeFile) {
    throw new ApiError(400, "Resume file is required");
  }

  const { title, targetRole, companyName, jobDescription } = reportData;

  const report = await InterviewReport.create({
    user: userId,
    title,
    targetRole,
    companyName,
    jobDescription,
    resumeFile: {
      originalName: resumeFile.originalname,
      fileName: resumeFile.filename,
      filePath: resumeFile.path,
      mimeType: resumeFile.mimetype,
      size: resumeFile.size,
    },
    status: "pending",
  });

  return report;
};

const getUserInterviewReports = async (userId) => {
  const reports = await InterviewReport.find({ user: userId })
    .sort({ createdAt: -1 })
    .select("-resumeText")
    .lean();

  return reports;
};

const getInterviewReportById = async ({ userId, reportId }) => {
  const report = await InterviewReport.findOne({
    _id: reportId,
    user: userId,
  }).lean();

  if (!report) {
    throw new ApiError(404, "Interview report not found");
  }

  return report;
};

const safelyDeleteResumeOnFailure = (resumeFile) => {
  if (resumeFile?.path) {
    deleteLocalFile(resumeFile.path);
  }
};

export default {
  createInterviewReport,
  getUserInterviewReports,
  getInterviewReportById,
  safelyDeleteResumeOnFailure,
};