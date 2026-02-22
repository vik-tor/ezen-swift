import { apiFetchSafe, type ApiResult } from '$lib/client';

export interface APIKey {
	id: number;
	apiKey: string;
	secret: string;
	active: boolean;
	dlrWebhookUrl: string;
	createdAt: string;
	updatedAt: string;
}

export async function fetchApiKeys(
	fetch: typeof globalThis.fetch,
	locals: App.Locals
): Promise<ApiResult<APIKey[]>> {
	return apiFetchSafe(fetch, locals, '/api-keys');
}

export async function generateApiKey(
	fetch: typeof globalThis.fetch,
	locals: App.Locals
): Promise<ApiResult<APIKey>> {
	return apiFetchSafe(fetch, locals, '/api-keys/generate', {
		method: 'POST'
	});
}

export async function getCurrentApiKey(
	fetch: typeof globalThis.fetch,
	locals: App.Locals
): Promise<ApiResult<APIKey>> {
	return apiFetchSafe(fetch, locals, '/api-keys/current');
}

export function updateApiKeyWebhookUrl(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	newWebhookUrl: string
): Promise<ApiResult<void>> {
	return apiFetchSafe(
		fetch,
		locals,
		`/api-keys/webhook?webhookUrl=${encodeURIComponent(newWebhookUrl)}`,
		{
			method: 'POST'
		}
	);
}
