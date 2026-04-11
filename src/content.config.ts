import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      company: z.string(),
      role: z.string(),
      years: z.string(),
      description: z.string(),
      heroImage: image(),
      heroImageAlt: z.string(),
      credits: z.array(z.string()).optional(),
      protected: z.boolean().default(false),
      order: z.number(),
      slug: z.string(),
    }),
});

export const collections = { projects };
