import { redirect, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ locals, url }) => {
	if (!locals.isAuthenticated && !url.pathname.startsWith('/auth')) {
		throw redirect(303, '/auth/login');
	}

	return {
		user: locals.user,
		roles: locals.user?.roles || []
	};
};
