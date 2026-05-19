import { H3Event, createError, readBody, getQuery, getRouterParams } from 'h3';
import { z, ZodType } from 'zod';

export const validateRequest = async <
	T extends {
		body?: ZodType;
		query?: ZodType;
		params?: ZodType;
	},
>(
	event: H3Event,
	schemas: T,
): Promise<{
	body: T['body'] extends ZodType ? z.infer<T['body']> : unknown;
	query: T['query'] extends ZodType ? z.infer<T['query']> : unknown;
	params: T['params'] extends ZodType ? z.infer<T['params']> : unknown;
}> => {
	const errors: string[] = [];
	const result: any = {};

	if (schemas.body) {
		const rawBody = await readBody(event).catch(() => ({}));
		const parsed = await schemas.body.safeParseAsync(rawBody);
		if (!parsed.success) errors.push(parsed.error.message);
		else result.body = parsed.data;
	}

	if (schemas.query) {
		const rawQuery = getQuery(event);
		const parsed = await schemas.query.safeParseAsync(rawQuery);
		if (!parsed.success) errors.push(parsed.error.message);
		else result.query = parsed.data;
	}

	if (schemas.params) {
		const rawParams = getRouterParams(event);
		const parsed = await schemas.params.safeParseAsync(rawParams);
		if (!parsed.success) errors.push(parsed.error.message);
		else result.params = parsed.data;
	}

	if (errors.length) {
		throw createError({ statusCode: 400, message: errors.join(', ') });
	}

	return result;
};
