import type { PageServerLoad } from './$types';

import { fetchWalletTransactions } from '$lib/server/api/client/wallet';

export const load: PageServerLoad = async ({ fetch, locals }) => {
	const transactionsRes = await fetchWalletTransactions(fetch, locals);

	if (!transactionsRes.ok) {
		return {
			transactions: [],
			apiError: {
				message: transactionsRes.error.message,
				status: transactionsRes.error.status
			}
		};
	}

	const transactions = transactionsRes.data.content ?? [];
	return { transactions };
};
