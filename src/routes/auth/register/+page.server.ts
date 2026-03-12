import { API_BASE } from '$lib/client';
import { type Actions, fail } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const formData = {
			email: form.get('email'),
			password: form.get('password'),
			username: form.get('username'),
			name: form.get('name'),
			contact: form.get('contact')
		};

		if (formData.password !== form.get('confirm-password')) {
			return fail(400, {
				failed: true,
				error: 'Passwords do not match',
				username: formData.username,
				name: formData.name,
				email: formData.email,
				contact: formData.contact
			});
		}

		await fetch(API_BASE + '/auth/register', {
			method: 'POST',
			body: JSON.stringify(formData)
		});

		return { success: true };
	}
};
