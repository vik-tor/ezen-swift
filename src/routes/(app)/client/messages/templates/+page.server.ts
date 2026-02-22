import { type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { createMessageTemplate, fetchMessageTemplates } from '$lib/server/api/client/templates';
import type { MessageTemplate } from '$lib/server/api/client/templates';

interface TemplatesPageResponse {
	templates: MessageTemplate[];
	apiError?: {
		message: string;
		status: number;
	};
}

export const load: PageServerLoad = async ({ fetch, locals }): Promise<TemplatesPageResponse> => {
	const templateRes = await fetchMessageTemplates(fetch, locals);

	if (!templateRes.ok) {
		console.log('Failed to fetch message templates:', templateRes.error);
		return {
			templates: [],
			apiError: { message: templateRes.error?.message, status: templateRes.error?.status }
		};
	}
	const templates = templateRes.data.content;
	console.log('Fetched message templates:', templates);

	return { templates };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const formData: Omit<MessageTemplate, 'id' | 'default' | 'createdAt' | 'updatedAt'> & {
			isDefault: boolean;
		} = {
			name: form.get('name') as string,
			content: form.get('content') as string,
			category: form.get('category') as 'PROMOTIONAL' | 'TRANSACTIONAL',
			isDefault: form.get('isDefault') === 'on'
		};

		await createMessageTemplate(fetch, locals, formData);
	}
};
