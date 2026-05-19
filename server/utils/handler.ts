import { H3Event, createError } from 'h3';

type HandlerFn<TResult> = (e: {
	event: H3Event;
	signal: AbortSignal;
}) => Promise<TResult>;

interface HandlerOptions {
	timeoutMs?: number;
}

export function defineCustomHandler<TResult = any>(
	handler: HandlerFn<TResult>,
	options: HandlerOptions = {},
) {
	const { timeoutMs = 5000 } = options;

	return defineEventHandler(async (event) => {
		const { signal, abort } = new AbortController();
		event.node.req.on('close', () => {
			if (!event.node.req.destroyed) {
				abort();
			}
		});

		const timeoutId = setTimeout(() => {
			abort();
		}, timeoutMs);

		const startTime = Date.now();

		try {
			const result = await handler({
				event,
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
