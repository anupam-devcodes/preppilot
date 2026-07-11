import ApiError from "./ApiError.js";

export const parseJsonFromText = (text = "") => {
  if (!text.trim()) {
    throw new ApiError(500, "AI returned an empty response");
  }

  try {
    return JSON.parse(text);
  } catch {
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new ApiError(500, "AI response did not contain valid JSON");
    }

    try {
      return JSON.parse(jsonMatch[0]);
    } catch {
      throw new ApiError(500, "Unable to parse AI response JSON");
    }
  }
};