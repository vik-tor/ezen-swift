import { API_BASE } from '$lib/client';
import { Roles } from '$lib/shared/types/domain/roles';
import { userStore } from '$lib/server/stores/users.instance';
import { redirect, fail, type ServerLoad } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load: ServerLoad = async ({ locals, url }) => {
	if (locals.isAuthenticated) {
		if (locals.user?.roles.includes(Roles.ADMIN) || locals.user?.roles.includes(Roles.USER)) {
			throw redirect(303, '/admin/dashboard');
		} else if (locals.user?.roles.includes(Roles.CLIENT)) {
			throw redirect(303, '/client/dashboard');
		}
	}

	return {
		expired: url.searchParams.get('expired') === 'true'
	};
};

export const actions: Actions = {
	default: async ({ request, cookies, locals }) => {
		const form = await request.formData();
		const formData = {
			username: form.get('username'),
			password: form.get('password')
		};

		if (!formData.username) {
			return fail(400, {
				failed: true,
				error: 'Username is required',
				username: formData.username
			});
		}

		try {
			const res = await fetch(API_BASE + '/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			});

			if (!res.ok) {
				return fail(401, {
					failed: true,
					error: 'Invalid username or password',
					username: formData.username
				});
			}

			const { accessToken, expiresIn, user } = await res.json();
			user.expiresAt = Date.now() + expiresIn * 1000;

			cookies.set('access_token', accessToken, {
				httpOnly: true,
				secure: true,
				sameSite: 'lax',
				path: '/',
				expires: new Date(Date.now() + expiresIn * 1000)
			});

			userStore.set(accessToken, user);
			locals.user = user!;
			locals.accessToken = accessToken;
			locals.isAuthenticated = true;

			if (user.roles.includes(Roles.ADMIN) || user.roles.includes(Roles.USER)) {
				redirect(303, '/admin/dashboard');
			} else if (user.roles.includes(Roles.CLIENT)) {
				redirect(303, '/client/dashboard');
			}
		} catch (err) {
			const e = err as Error | undefined;

			if (e?.name === 'AbortError') {
				return fail(504, {
					failed: true,
					error: 'Request timed out',
					username: formData.username
				});
			}

			return fail(503, {
				failed: true,
				error: 'Network error. Please try again.',
				username: formData.username
			});
		}
	}
};
