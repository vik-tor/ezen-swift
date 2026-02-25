import type { PageServerLoad } from './$types';

import { getMyRates } from '$lib/server/api/client/wallet';
import type { CurrentRatesWithHistory, RateHistory } from '$lib/shared/types/domain/bands';

interface RatesPageData {
	rates: CurrentRatesWithHistory;
	history: RateHistory[];
	apiError?: {
		message: string;
		status: number;
	};
}

const createErrorResponse = (message: string, status: number): RatesPageData => ({
	rates: {} as CurrentRatesWithHistory,
	history: [] as RateHistory[],
	apiError: { message, status }
});

export const load: PageServerLoad = async ({ fetch, locals }): Promise<RatesPageData> => {
	const ratesRes = await getMyRates(fetch, locals);

	if (!ratesRes.ok) {
		return createErrorResponse(ratesRes.error.message, ratesRes.error.status);
	}

	const rates = ratesRes.data;
	const history = rates.auditHistory;

	return { rates, history };
};
