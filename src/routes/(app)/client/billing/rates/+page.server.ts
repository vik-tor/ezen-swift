import type { PageServerLoad } from './$types';

import { getMyRates } from '$lib/server/api/client/wallet';

export const load: PageServerLoad = async ({ fetch, locals }) => {
	const transactionsRes = await getMyRates(fetch, locals);

	if (!transactionsRes.ok) {
		return {
			transactions: [],
			apiError: {
				message: transactionsRes.error.message,
				status: transactionsRes.error.status
			}
		};
	}

	const rates = transactionsRes.data ?? [];
	const history = rates.auditHistory;

	return { rates, history };
};
