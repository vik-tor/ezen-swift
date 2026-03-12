import { type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { applySenderId, fetchSenderIds } from '$lib/server/api/client/sender-ids';
import type { SenderIdRequest } from '$lib/shared/types/domain/sender-id';

export const load: PageServerLoad = async ({ fetch, locals }) => {
	const senderIdRes = await fetchSenderIds(fetch, locals);
	if (!senderIdRes.ok) {
		return {
			senderIds: [],
			apiError: { message: senderIdRes.error?.message, status: senderIdRes.error?.status }
		};
	}

	const senderIds = senderIdRes.data;
	return { senderIds };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const formData: SenderIdRequest = {
			name: form.get('name') as string,
			description: form.get('description') as string,
			category: form.get('category') as 'PROMOTIONAL' | 'TRANSACTIONAL',
			sampleMessage: form.get('sampleMessage') as string
		};

		await applySenderId(fetch, locals, formData);
	}
};
