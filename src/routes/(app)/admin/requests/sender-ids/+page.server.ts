import type { SenderId } from '$lib/shared/types/domain/sender-id';
import { type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { fetchAllSenderIds, reviewSenderId } from '$lib/server/api/admin/sender-ids';

interface PageResponse {
	senderIds: SenderId[];
	apiError?: { message: string; status: number };
}

const createErrorResponse = (message: string, status: number): PageResponse => ({
	senderIds: [],
	apiError: { message, status }
});

export const load: PageServerLoad = async ({ url, fetch, locals }): Promise<PageResponse> => {
	const page = Number(url.searchParams.get('page') ?? 1);
	const limit = Number(url.searchParams.get('limit') ?? 20);
	const status = url.searchParams.get('status') ?? '';

	const params = {
		page,
		status: status as 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED',
		size: limit
	};

	const senderIdsRes = await fetchAllSenderIds(fetch, locals, params);
	if (!senderIdsRes.ok) {
		return createErrorResponse(senderIdsRes.error.message, senderIdsRes.error.status);
	}

	return {
		senderIds: senderIdsRes.data?.content ?? []
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const formData = {
			senderId: form.get('senderId') as string,
			approved: form.get('approved') as unknown as boolean,
			reason: form.get('reason') as string
		};

		await reviewSenderId(fetch, locals, formData.senderId, {
			approved: formData.approved,
			reason: formData.reason
		});
	}
};
