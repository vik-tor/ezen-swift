import { userStore } from '$lib/server/stores/users.instance';
import { redirect, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = ({ cookies }) => {
	const token = cookies.get('access_token');
	if (token) {
		userStore.delete(token);
	}

	cookies.delete('access_token', { path: '/' });

	throw redirect(303, '/login');
};
