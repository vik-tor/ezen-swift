import type { Handle } from '@sveltejs/kit';
import { userStore } from '$lib/server/stores/users.instance';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('access_token');

	if (token) {
		const user = userStore.get(token);
		event.locals.user = user!;
		event.locals.accessToken = token;
	}
	event.locals.isAuthenticated = Boolean(token);

	return resolve(event);
};

// export const handleFetch: HandleFetch = async ({ request, fetch }) => {
// 	if (request.url.startsWith('http://163.245.209.171:8081/')) {
// 		request = new Request(
// 			request.url.replace('http://163.245.209.171:8081/', 'http://localhost:8081/'),
// 			request
// 		);
// 	}

// 	return fetch(request);
// };
