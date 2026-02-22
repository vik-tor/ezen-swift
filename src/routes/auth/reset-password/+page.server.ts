import { API_BASE } from '$lib/client';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();

		await fetch(API_BASE + '/auth/register', {
			method: 'POST',
			body: JSON.stringify({
				email: form.get('email'),
				password: form.get('password'),
				username: form.get('username')
			})
		});

		return { success: true };
	}
};
