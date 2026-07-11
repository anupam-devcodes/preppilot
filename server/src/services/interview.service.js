import InterviewReport from "../models/interviewReport.model.js";
import ApiError from "../utils/ApiError.js";
import deleteLocalFile from "../utils/deleteLocalFile.js";
import resumeParserService from "./resumeParser.service.js";
import geminiService from "./gemini.service.js";

const createInterviewReport = async ({ userId, reportData, resumeFile }) => {
  if (!resumeFile) {
    throw new ApiError(400, "Resume file is required");
  }

  const { title, targetRole, companyName, jobDescription } = reportData;

  let parsedResume;

  try {
    parsedResume = await resumeParserService.extractResumeText(resumeFile);
  } catch (error) {
    deleteLocalFile(resumeFile.path);
    throw error;
  }

  let report;

  try {
    report = await InterviewReport.create({
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
      resumeText: parsedResume.text,
      resumeStats: {
        characterCount: parsedResume.stats.characterCount,
        wordCount: parsedResume.stats.wordCount,
        parsedAt: new Date(),
      },
      status: "pending",
    });
  } catch (error) {
    deleteLocalFile(resumeFile.path);
    throw error;
  }

  try {
    const aiAnalysis = await geminiService.generateInterviewAnalysis({
      resumeText: parsedResume.text,
      jobDescription,
      targetRole,
      companyName,
    });

    report.matchScore = aiAnalysis.matchScore;
    report.aiSummary = aiAnalysis.aiSummary;
    report.strengths = aiAnalysis.strengths;
    report.weaknesses = aiAnalysis.weaknesses;
    report.skillGaps = aiAnalysis.skillGaps;
    report.interviewQuestions = aiAnalysis.interviewQuestions;
    report.status = "completed";
    report.errorMessage = "";

    await report.save();

    const completedReport = await InterviewReport.findById(report._id)
      .select("-resumeText")
      .lean();

    return completedReport;
  } catch (error) {
    report.status = "failed";
    report.errorMessage = error.message || "AI analysis failed";

    await report.save();

    throw error;
  }
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
  })
    .select("-resumeText")
    .lean();

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