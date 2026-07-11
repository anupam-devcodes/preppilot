import { z } from "zod";

const importanceSchema = z.enum(["low", "medium", "high"]);
const difficultySchema = z.enum(["easy", "medium", "hard"]);
const categorySchema = z.enum([
  "technical",
  "behavioral",
  "project",
  "resume",
  "hr",
]);

export const interviewAnalysisSchema = z.object({
  matchScore: z
    .number()
    .min(0)
    .max(100),

  aiSummary: z
    .string()
    .min(20, "AI summary is too short")
    .max(2500, "AI summary is too long"),

  strengths: z
    .array(z.string().min(3))
    .min(3)
    .max(8),

  weaknesses: z
    .array(z.string().min(3))
    .min(2)
    .max(8),

  skillGaps: z
    .array(
      z.object({
        skill: z.string().min(2),
        importance: importanceSchema,
        suggestion: z.string().min(5),
      })
    )
    .min(3)
    .max(10),

  interviewQuestions: z
    .array(
      z.object({
        question: z.string().min(10),
        category: categorySchema,
        difficulty: difficultySchema,
        expectedAnswerHint: z.string().min(5),
      })
    )
    .min(6)
    .max(15),
});