import { API_URL } from '$env/static/private';
import { redirect, type Redirect } from '@sveltejs/kit';

export const API_BASE = `${API_URL}/api/v1`;

export interface ApiResponse<T = unknown> {
	status: number;
	message: string;
	data: T;
	timestamp: string;
}

export class ApiError<T = unknown> extends Error {
	status: number;
	data?: T;
	timestamp?: string;

	constructor(message: string, status: number, data?: T, timestamp?: string) {
		super(message);
		this.name = 'ApiError';
		this.status = status;
		this.data = data;
		this.timestamp = timestamp;
	}
}

export async function apiFetch<T>(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	path: string,
	init: RequestInit = {}
): Promise<T> {
	let res: Response;

	try {
		res = await fetch(`${API_BASE}${path}`, {
			...init,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${locals.accessToken}`,
				...init.headers
			}
		});
	} catch (err) {
		const e = err as Error | undefined;
		// Abort (timeout) vs network-level failures
		if (e?.name === 'AbortError') {
			console.log('504: Request aborted (timeout):', err);
			throw new ApiError('Request aborted (timeout)', 504);
		}
		// Generic network error (server not found/unresponsive, DNS, offline)
		console.log('503: Network error: could not reach API:', err);
		throw new ApiError(e?.message ?? 'Network error: could not reach API', 503);
	}

	let payload: ApiResponse<T>;
	try {
		payload = await res.json();
	} catch {
		console.log(`${res.status}: Malformed response from server`);
		throw new ApiError('Malformed response from server', res.status);
	}

	// Handle 401 Unauthorized - session expired
	if (res.status === 401) {
		console.log(`${res.status}: Unauthorized - session expired`);
		throw redirect(303, '/auth/login?expired=true');
	}

	// Transport-level (HTTP, 4xx / 5xx) failure
	if (!res.ok) {
		console.log(`${res.status}: Transport-level failure - External API request failed`);
		throw new ApiError(
			payload?.message || 'External API request failed',
			res.status,
			payload?.data,
			payload?.timestamp
		);
	}

	// API-level failure (API returned non-success status)
	if (payload.status !== 200) {
		console.log(`${payload.status}: API-level failure - API returned non-success status`);
		throw new ApiError(payload.message, payload.status, payload.data, payload.timestamp);
	}

	return payload.data;
}

/**
 * Non-throwing wrapper that returns a predictable ApiResult.
 * Use this from SvelteKit server `load` to avoid throwing and let the page render with error data.
 */
export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: ApiError<unknown> };

export async function apiFetchSafe<T>(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	path: string,
	init: RequestInit = {}
): Promise<ApiResult<T>> {
	try {
		const data = await apiFetch<T>(fetch, locals, path, init);
		return { ok: true, data };
	} catch (err) {
		if (isRedirect(err)) {
			throw err;
		}

		if (err instanceof ApiError) {
			return { ok: false, error: err };
		}

		const maybe = err as Error | undefined;
		return {
			ok: false,
			error: new ApiError(maybe?.message ?? 'Unknown error', 500)
		};
	}
}

function isRedirect(value: unknown): value is Redirect {
	return typeof value === 'object' && value !== null && 'status' in value && 'location' in value;
}
