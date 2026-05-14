import { z } from "zod";

export const AlgorithmSchema = z.object({
  id: z.string().min(1, "ID is required"),
  metadata: z.object({
    title: z.string().min(1, "Title is required"),
    subtitle: z.string().optional(),
    category: z.string().min(1, "Category is required"),
    tags: z.array(z.string()),
    stability: z.enum(["stable", "unstable", "n/a"]).optional(),
  }),
  complexity: z.object({
    time: z.object({
      best: z.string(),
      average: z.string(),
      worst: z.string(),
      worst_weight: z.number().optional(),
    }),
    space: z.object({
      average: z.string(),
      notes: z.string().optional(),
    }),
    recurrence_relation: z.string().optional(),
  }),
  documentation: z.object({
    description: z.string().min(10, "Description should be at least 10 characters"),
    how_it_works: z.array(z.string()),
    applications: z.array(z.string()),
    pitfalls: z.array(z.string()),
    comparisons: z.array(z.object({
      alternative_to: z.string(),
      reason: z.string(),
    })).optional(),
  }),
  implementations: z.array(z.object({
    language: z.string(),
    snippet: z.string(),
    explanation: z.string(),
  })),
  visualizer_config: z.object({
    type: z.string(),
    default_data_size: z.number().optional(),
    default_data_pattern: z.string().optional(),
    complexity_level: z.string().optional(),
  }),
  citations: z.array(z.object({
    source_name: z.string(),
    authors: z.string(),
    chapter_or_page: z.string().optional(),
  })),
  // Optional field for the upcoming dynamic logic engine
  logic: z.object({
    steps: z.array(z.object({
      action: z.string(),
      params: z.any(),
    })).optional(),
  }).optional(),
});

export type AlgorithmType = z.infer<typeof AlgorithmSchema>;
