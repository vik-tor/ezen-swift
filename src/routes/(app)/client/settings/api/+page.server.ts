import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

import {
	fetchApiKeys,
	generateApiKey,
	getCurrentApiKey,
	updateApiKeyWebhookUrl,
	type APIKey
} from '$lib/server/api/client/api-keys';

interface ApiKeysPageData {
	currentKey: APIKey;
	apiKeys: APIKey[];
	apiError?: {
		message: string;
		status: number;
	};
}

const createErrorResponse = (message: string, status: number): ApiKeysPageData => ({
	currentKey: {} as APIKey,
	apiKeys: [],
	apiError: { message, status }
});

export const load: PageServerLoad = async ({ fetch, locals }): Promise<ApiKeysPageData> => {
	const currentKeyRes = await getCurrentApiKey(fetch, locals);
	const apiKeysRes = await fetchApiKeys(fetch, locals);

	if (!currentKeyRes.ok) {
		return createErrorResponse(currentKeyRes.error.message, currentKeyRes.error.status);
	}

	if (!apiKeysRes.ok) {
		return createErrorResponse(apiKeysRes.error.message, apiKeysRes.error.status);
	}

	const currentKey: APIKey = currentKeyRes.data ?? {};
	const apiKeys: APIKey[] = apiKeysRes.data ?? [];

	return { currentKey, apiKeys };
};

export const actions: Actions = {
	generate: async ({ locals }) => {
		const res = await generateApiKey(fetch, locals);
		if (res instanceof Error) {
			return fail(400, { error: res.message });
		}
	},

	updateWebhook: async ({ request, locals }) => {
		const form = await request.formData();
		const res = await updateApiKeyWebhookUrl(fetch, locals, form.get('webhookUrl') as string);
		if (res instanceof Error) {
			return fail(400, { error: res.message });
		}
	}
};
