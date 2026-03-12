import { apiFetchSafe, type ApiResult } from '$lib/client';
import type { PaginatedResponse, PaginationParams } from '$lib/shared/types/page/paginate';
import type { SenderId } from '$lib/shared/types/domain/sender-id';

export async function reviewSenderId(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	senderId: string,
	reviewData: { approved: boolean; reason: string }
): Promise<ApiResult<void>> {
	return apiFetchSafe(fetch, locals, `/admin/sender-ids/${senderId}/review`, {
		method: 'POST',
		body: JSON.stringify(reviewData)
	});
}

export async function fetchPendingSenderIds(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	params?: PaginationParams
): Promise<ApiResult<PaginatedResponse<SenderId>>> {
	return apiFetchSafe<PaginatedResponse<SenderId>>(
		fetch,
		locals,
		`/admin/sender-ids/pending?${new URLSearchParams(params as Record<string, string>).toString()}`
	);
}

export async function fetchApprovedSenderIds(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	params?: PaginationParams
): Promise<ApiResult<PaginatedResponse<SenderId>>> {
	return apiFetchSafe<PaginatedResponse<SenderId>>(
		fetch,
		locals,
		`/admin/sender-ids/approved?${new URLSearchParams(params as Record<string, string>).toString()}`
	);
}

export async function fetchAllSenderIds(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	params?: PaginationParams & { status?: 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED' }
): Promise<ApiResult<PaginatedResponse<SenderId>>> {
	return apiFetchSafe<PaginatedResponse<SenderId>>(
		fetch,
		locals,
		`/admin/sender-ids/all?${new URLSearchParams(params as Record<string, string>).toString()}`
	);
}
