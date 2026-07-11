import { GoogleGenAI } from "@google/genai";

import ApiError from "../utils/ApiError.js";
import { parseJsonFromText } from "../utils/json.utils.js";
import { interviewAnalysisSchema } from "../validations/aiResponse.validation.js";
import aiPromptService from "./aiPrompt.service.js";

const getGeminiClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new ApiError(500, "Gemini API key is not configured");
  }

  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
};

const generateInterviewAnalysis = async ({
  resumeText,
  jobDescription,
  targetRole,
  companyName,
}) => {
  const ai = getGeminiClient();

  const prompt = aiPromptService.buildInterviewAnalysisPrompt({
    resumeText,
    jobDescription,
    targetRole,
    companyName,
  });

  let responseText = "";

  try {
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    responseText = response.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error.message);

    throw new ApiError(
      502,
      "Failed to generate interview analysis. Please try again."
    );
  }

  const parsedJson = parseJsonFromText(responseText);

  const validationResult = interviewAnalysisSchema.safeParse(parsedJson);

  if (!validationResult.success) {
    console.error("Invalid Gemini Response:", validationResult.error.issues);

    throw new ApiError(
      500,
      "AI response format was invalid. Please try again."
    );
  }

  return validationResult.data;
};

export default {
  generateInterviewAnalysis,
};