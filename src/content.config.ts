import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PATH = "src/contents/posts";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
      copyright: z.string().optional(),
    }),
});

export const JOTTINGS_PATH = "src/contents/jottings";

const jottings = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${JOTTINGS_PATH}` }),
  schema: z.object({
    author: z.string().default(SITE.author),
    pubDatetime: z.date(),
    modDatetime: z.date().optional().nullable(),
    title: z.string(),
    draft: z.boolean().optional(),
  }),
});

export const PAGES_PATH = "src/contents/pages";

const pages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${PAGES_PATH}` }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { blog, jottings, pages };
