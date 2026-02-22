import { apiFetch } from '$lib/client';
import type { CurrentRatesWithHistory } from '$lib/shared/types/bands';
import type { PaginatedResponse, PaginationParams } from '$lib/shared/types/paginate';

export interface PricingBand {
	id: number;
	minSingleTopup: number;
	maxSingleTopup: number;
	rateSafaricom: number;
	rateAirtel: number;
	active: boolean;
	createdAt: string;
}

export async function fetchPricingBands(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	params: PaginationParams
): Promise<PaginatedResponse<PricingBand>> {
	return apiFetch<PaginatedResponse<PricingBand>>(
		fetch,
		locals,
		`/admin/pricing-bands?${new URLSearchParams(params as Record<string, string>).toString()}`
	);
}

export async function fetchActivePricingBands(
	fetch: typeof globalThis.fetch,
	locals: App.Locals
): Promise<PricingBand[]> {
	return apiFetch<PricingBand[]>(fetch, locals, '/admin/pricing-bands/active');
}

export function getPricingBand(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	bandId: number
): Promise<PricingBand> {
	return apiFetch<PricingBand>(fetch, locals, `/admin/pricing-bands/${bandId}`);
}

export function createPricingBand(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	bandData: Omit<PricingBand, 'id' | 'createdAt'>
): Promise<PricingBand> {
	return apiFetch<PricingBand>(fetch, locals, '/admin/pricing-bands', {
		method: 'POST',
		body: JSON.stringify(bandData)
	});
}

export function updatePricingBand(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	bandId: number,
	bandData: Partial<Omit<PricingBand, 'id' | 'createdAt'>>
): Promise<PricingBand> {
	return apiFetch<PricingBand>(fetch, locals, `/admin/pricing-bands/${bandId}`, {
		method: 'PUT',
		body: JSON.stringify(bandData)
	});
}

export function deletePricingBand(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	bandId: number
): Promise<void> {
	return apiFetch(fetch, locals, `/admin/pricing-bands/${bandId}`, {
		method: 'DELETE'
	});
}

export function overrideUserRates(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	userId: number,
	rateData: { rateSafaricom: number; rateAirtel: number; reason: string }
): Promise<void> {
	return apiFetch(fetch, locals, `/admin/pricing-bands/users/${userId}/override-rates`, {
		method: 'POST',
		body: JSON.stringify(rateData)
	});
}

export function getUserRates(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	userId: number
): Promise<CurrentRatesWithHistory> {
	return apiFetch(fetch, locals, `/admin/pricing-bands/users/${userId}/rates`);
}
