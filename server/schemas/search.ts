import { z } from 'zod';

export const searchWordsSchema = z.object({
	grid: z.array(z.array(z.string()).min(2).max(8)).min(2).max(8),
	minWordLength: z.number().int().min(1).max(20).default(3),
	maxResults: z.number().int().min(1).max(100).default(12),
	timeoutMs: z.number().int().min(100).max(30000).default(5000),
});
