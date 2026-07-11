import mongoose from "mongoose";

const resumeFileSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: true,
    },
    importance: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    suggestion: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  }
);

const interviewQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["technical", "behavioral", "project", "resume", "hr"],
      default: "technical",
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
    expectedAnswerHint: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  }
);

const interviewReportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [120, "Title cannot exceed 120 characters"],
    },

    targetRole: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Target role cannot exceed 100 characters"],
    },

    companyName: {
      type: String,
      trim: true,
      default: "",
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },

    jobDescription: {
      type: String,
      required: true,
      trim: true,
      minlength: [50, "Job description must be at least 50 characters long"],
    },

    resumeFile: {
      type: resumeFileSchema,
      required: true,
    },

    resumeText: {
      type: String,
      default: "",
    },

    resumeStats: {
    characterCount: {
        type: Number,
        default: 0,
    },
    wordCount: {
        type: Number,
        default: 0,
    },
    parsedAt: {
        type: Date,
    },
    },

    matchScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
    },
    aiSummary: {
      type: String,
      default: "",
    },

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    skillGaps: {
      type: [skillGapSchema],
      default: [],
    },

    interviewQuestions: {
      type: [interviewQuestionSchema],
      default: [],
    },

    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },

    errorMessage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const InterviewReport = mongoose.model(
  "InterviewReport",
  interviewReportSchema
);

export default InterviewReport;