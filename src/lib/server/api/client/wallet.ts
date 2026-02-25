import { apiFetchSafe, type ApiResult } from '$lib/client';
import type { CurrentRatesWithHistory } from '$lib/shared/types/domain/bands';
import type { PaginatedResponse, PaginationParams } from '$lib/shared/types/page/paginate';

export interface WalletTransaction {
	id: number;
	amount: number;
	type: string;
	description: string;
	reference: string;
	createdAt: string;
}

export interface WalletTopupRequest {
	amount: number;
	reference: string;
	description: string;
}

export async function fetchWalletTransactions(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	params?: PaginationParams
): Promise<ApiResult<PaginatedResponse<WalletTransaction>>> {
	return apiFetchSafe(
		fetch,
		locals,
		`/wallets/transactions?${new URLSearchParams(params as Record<string, string>).toString()}`
	);
}

export async function getMyWalletBalance(
	fetch: typeof globalThis.fetch,
	locals: App.Locals
): Promise<ApiResult<number>> {
	return apiFetchSafe(fetch, locals, `/wallets/my`);
}

export async function getMyRates(
	fetch: typeof globalThis.fetch,
	locals: App.Locals
): Promise<ApiResult<CurrentRatesWithHistory>> {
	return apiFetchSafe(fetch, locals, `/wallets/my-rates`);
}

export async function simulateWalletTopup(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	topUpData: WalletTopupRequest
): Promise<void> {
	await apiFetchSafe(fetch, locals, '/wallets/simulate-topup', {
		method: 'POST',
		body: JSON.stringify(topUpData)
	});
}
