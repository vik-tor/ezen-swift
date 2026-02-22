import { apiFetchSafe, type ApiResult } from '$lib/client';
import type { SenderId, SenderIdRequest } from '$lib/shared/types/sender-id';

export async function fetchSenderIds(
	fetch: typeof globalThis.fetch,
	locals: App.Locals
): Promise<ApiResult<SenderId[]>> {
	return apiFetchSafe(fetch, locals, '/sender-ids/my');
}

export async function applySenderId(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	senderIdData: SenderIdRequest
): Promise<ApiResult<void>> {
	return apiFetchSafe(fetch, locals, '/sender-ids/apply', {
		method: 'POST',
		body: JSON.stringify(senderIdData)
	});
}
