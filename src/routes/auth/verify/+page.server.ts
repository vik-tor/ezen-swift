import { API_BASE } from '$lib/client.js';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	activate: async ({ url }) => {
		const token = url.searchParams.get('token');

		if (!token) {
			throw redirect(303, '/login');
		}

		const res = await fetch(API_BASE + '/auth/activate?token=' + token, {
			method: 'POST'
		});

		if (!res.ok) {
			return { verified: false };
		}

		throw redirect(303, '/login?verified=1');
	}
};
