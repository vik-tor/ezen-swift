import { type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import {
	createContactGroup,
	fetchContactGroups,
	type ContactGroup
} from '$lib/server/api/client/groups';

export const load: PageServerLoad = async ({ fetch, locals }) => {
	const groupRes = await fetchContactGroups(fetch, locals);
	if (!groupRes.ok) {
		return {
			contactGroups: [],
			apiError: { message: groupRes.error?.message, status: groupRes.error?.status }
		};
	}

	const contactGroups = groupRes.data.content;
	console.log('Fetched contact groups:', contactGroups);

	return { contactGroups };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const formData: Omit<ContactGroup, 'id' | 'createdAt' | 'updatedAt' | 'memberCount'> = {
			name: form.get('name') as string,
			description: form.get('description') as string
		};

		await createContactGroup(fetch, locals, formData);
	}
};
