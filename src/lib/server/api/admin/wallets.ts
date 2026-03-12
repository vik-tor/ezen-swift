import { apiFetchSafe, type ApiResult } from '$lib/client';
import type { PaginationParams, PaginatedResponse } from '$lib/shared/types/page/paginate';

export async function refundUsersWallet(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	params: { amount: number; description: string; userId: number }
): Promise<ApiResult<void>> {
	return apiFetchSafe(
		fetch,
		locals,
		`/wallets/${params.userId}/refund?amount=${params.amount}&description=${params.description}`,
		{
			method: 'POST'
		}
	);
}

export async function resetUsersWallet(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	userId: number
): Promise<ApiResult<void>> {
	return apiFetchSafe(fetch, locals, `/wallets/users/${userId}/reset-wallet`, {
		method: 'POST'
	});
}

export async function generateUsersWallet(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	userId: number
): Promise<ApiResult<void>> {
	return apiFetchSafe(fetch, locals, `/wallets/users/${userId}/generate-wallet`, {
		method: 'POST'
	});
}

export async function reverseWalletTransaction(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	transactionId: number,
	reason: string
): Promise<ApiResult<void>> {
	return apiFetchSafe(
		fetch,
		locals,
		`/wallets/transactions/${transactionId}/reverse?reason=${reason}`,
		{
			method: 'POST'
		}
	);
}

export async function cancelReverseWalletTransaction(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	transactionId: number,
	reason: string
): Promise<ApiResult<void>> {
	return apiFetchSafe(
		fetch,
		locals,
		`/wallets/transactions/${transactionId}/cancel-reverse?reason=${reason}`,
		{
			method: 'POST'
		}
	);
}

export interface WalletMigrationStats {
	totalClients: number;
	walletsCreated: number;
	alreadyHadWallet: number;
	failed: number;
	message: string;
}

/* Place this in Admin settings */
export async function migrateWallets(
	fetch: typeof globalThis.fetch,
	locals: App.Locals
): Promise<ApiResult<WalletMigrationStats>> {
	return apiFetchSafe<WalletMigrationStats>(fetch, locals, '/wallets/migrate', {
		method: 'POST'
	});
}

export interface ManualTopUp {
	id: number;
	userId: number;
	username: string;
	clientCode: string;
	amount: number;
	paymentMethod: string;
	reference: string;
	description: string;
	paymentDate: string;
	bankingDate: string;
	status: 'PENDING' | 'APPROVED';
	createdAt: string;
	updatedAt: string;
	rejectionReason: string;
	approvedById: number;
	approvedByUsername: string;
}

export async function approveManualTopupRequest(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	requestId: number,
	note: string
): Promise<ApiResult<void>> {
	return apiFetchSafe(fetch, locals, `/wallets/manual-topups/${requestId}/approve?note=${note}`, {
		method: 'POST'
	});
}

export async function rejectManualTopupRequest(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	requestId: number,
	reason: string
): Promise<ApiResult<void>> {
	return apiFetchSafe(
		fetch,
		locals,
		`/wallets/manual-topups/${requestId}/reject?reason=${reason}`,
		{
			method: 'POST'
		}
	);
}

export async function manualTopupRequest(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	topUpData: Omit<
		ManualTopUp,
		| 'id'
		| 'userId'
		| 'username'
		| 'status'
		| 'createdAt'
		| 'updatedAt'
		| 'rejectionReason'
		| 'approvedById'
		| 'approvedByUsername'
	>
): Promise<ApiResult<void>> {
	return apiFetchSafe(fetch, locals, '/wallets/manual-topup-request', {
		method: 'POST',
		body: JSON.stringify(topUpData)
	});
}

export async function getUserWalletBalance(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	userId: number
): Promise<ApiResult<number>> {
	return apiFetchSafe(fetch, locals, `wallets/${userId}`);
}

export async function fetchManualTopups(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	params?: PaginationParams
): Promise<ApiResult<PaginatedResponse<ManualTopUp>>> {
	return apiFetchSafe<PaginatedResponse<ManualTopUp>>(
		fetch,
		locals,
		`/wallets/manual-topups/pending?${new URLSearchParams(params as Record<string, string>).toString()}`
	);
}
