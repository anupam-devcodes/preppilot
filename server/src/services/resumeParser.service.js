import fs from "fs/promises";
import path from "path";
import * as pdfParseModule from "pdf-parse";
import mammoth from "mammoth";

import ApiError from "../utils/ApiError.js";
import {
  normalizeExtractedText,
  getWordCount,
} from "../utils/text.utils.js";

const MAX_RESUME_TEXT_LENGTH = 60000;

const parsePdfResume = async (filePath) => {
  const fileBuffer = await fs.readFile(filePath);

  const pdfParse =
    pdfParseModule.default ||
    pdfParseModule.pdfParse ||
    pdfParseModule.parse;

  if (!pdfParse) {
    throw new ApiError(
      500,
      "PDF parser is not available. Please check pdf-parse installation."
    );
  }

  const parsedPdf = await pdfParse(fileBuffer);

  return parsedPdf.text || "";
};  

const parseDocxResume = async (filePath) => {
  const result = await mammoth.extractRawText({
    path: filePath,
  });

  return result.value || "";
};

const extractResumeText = async (resumeFile) => {
  if (!resumeFile?.path) {
    throw new ApiError(400, "Resume file is required");
  }

  const fileExtension = path.extname(resumeFile.originalname).toLowerCase();

  let extractedText = "";

  try {
    if (resumeFile.mimetype === "application/pdf" || fileExtension === ".pdf") {
      extractedText = await parsePdfResume(resumeFile.path);
    } else if (
      resumeFile.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileExtension === ".docx"
    ) {
      extractedText = await parseDocxResume(resumeFile.path);
    } else {
      throw new ApiError(400, "Unsupported resume file type");
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      400,
      "Unable to extract text from resume. Please upload a readable PDF or DOCX file."
    );
  }

  const normalizedText = normalizeExtractedText(extractedText);

  if (normalizedText.length < 50) {
    throw new ApiError(
      400,
      "Could not extract enough text from the resume. Please upload a clearer resume file."
    );
  }

  const trimmedText = normalizedText.slice(0, MAX_RESUME_TEXT_LENGTH);

  return {
    text: trimmedText,
    stats: {
      characterCount: trimmedText.length,
      wordCount: getWordCount(trimmedText),
    },
  };
};

export default {
  extractResumeText,
};