import { z } from 'zod';

export const todoCreateSchema = z.object({
  name: z.string(),
});

export const todoUpdateSchema = z.object({
  name: z.string().optional(),
  done: z.boolean().optional(),
});