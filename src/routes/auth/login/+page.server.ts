import { API_BASE } from '$lib/client';
import { Roles } from '$lib/shared/types/roles';
import { userStore } from '$lib/server/stores/users.instance';
import { redirect, fail, type Actions, type ServerLoad } from '@sveltejs/kit';

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
	default: async ({ request, cookies }) => {
		const form = await request.formData();

		const res = await fetch(API_BASE + '/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: form.get('username'),
				password: form.get('password')
			})
		});

		if (!res.ok) {
			return fail(401, { invalid: true });
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

		console.log('Logged in user:', user);

		if (user.roles.includes(Roles.ADMIN) || user.roles.includes(Roles.USER)) {
			throw redirect(303, '/admin/dashboard');
		} else if (user.roles.includes(Roles.CLIENT)) {
			throw redirect(303, '/client/dashboard');
		}
	}
};
