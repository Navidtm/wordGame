import { H3Event, createError, readBody } from 'h3';
import type { ZodType } from 'zod';

type HandlerFn<TBody, TResult> = (e: {
	event: H3Event;
	body: TBody;
	signal: AbortSignal;
}) => Promise<TResult>;

interface HandlerOptions<TBody> {
	schema?: ZodType<TBody>;
	/** milliseconds, default 5000 */
	timeoutMs?: number;
}

export function defineCustomHandler<TBody = any, TResult = any>(
	handler: HandlerFn<TBody, TResult>,
	options: HandlerOptions<TBody> = {},
) {
	const { schema, timeoutMs = 5000 } = options;

	return defineEventHandler(async (event) => {
		const rawBody = await readBody(event);

		let validatedBody: TBody;
		if (schema) {
			const result = await schema.safeParseAsync(rawBody);
			if (!result.success) {
				throw createError({
					statusCode: 400,
					statusMessage: 'Bad Request',
					message: result.error.message,
				});
			}
			validatedBody = result.data;
		} else {
			validatedBody = rawBody as TBody;
		}

		// 3. آماده‌سازی AbortController برای لغو درخواست
		const { signal, abort } = new AbortController();
		event.node.req.on('close', () => {
			if (!event.node.req.destroyed) {
				abort();
			}
		});

		// 4. تایمر
		const timeoutId = setTimeout(() => {
			abort();
		}, timeoutMs);

		const startTime = Date.now();

		try {
			const result = await handler({
				event,
				body:validatedBody,
				signal,
			});

			const durationMs = Date.now() - startTime;

			return {
				...result,
				meta: {
					success: true,
					durationMs,
				},
			};
		} catch (err: any) {
			if (err.message === 'Operation aborted' || signal.aborted) {
				throw createError({
					statusCode: 499,
					message: 'Request cancelled or timeout',
				});
			}
			if (err.statusCode && err.message) {
				throw err;
			}
			console.error('[API Error]', err);
			throw createError({
				statusCode: 500,
				message: 'Internal Server Error',
			});
		} finally {
			clearTimeout(timeoutId);
		}
	});
}
