import type { PageServerLoad } from './$types';

import { fetchRoles } from '$lib/server/api/admin/users';

export const load: PageServerLoad = async ({ fetch, locals }) => {
	const rolesRes = await fetchRoles(fetch, locals);
	if (!rolesRes.ok) {
		return {
			roles: [],
			apiError: { message: rolesRes.error?.message, status: rolesRes.error?.status }
		};
	}

	const roles = rolesRes.data;
	return { roles };
};
