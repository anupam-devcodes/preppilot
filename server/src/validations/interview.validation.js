import { z } from "zod";

export const createInterviewReportSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters long")
    .max(120, "Title cannot exceed 120 characters"),

  targetRole: z
    .string()
    .trim()
    .min(2, "Target role is required")
    .max(100, "Target role cannot exceed 100 characters"),

  companyName: z
    .string()
    .trim()
    .max(100, "Company name cannot exceed 100 characters")
    .optional()
    .default(""),

  jobDescription: z
    .string()
    .trim()
    .min(50, "Job description must be at least 50 characters long"),
});