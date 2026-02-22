import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { Roles } from '$lib/shared/types/roles';

export const load: LayoutLoad = async ({ parent }) => {
	const { roles } = await parent();

	console.log('Roles in admin layout:', roles);

	if (!roles.includes(Roles.ADMIN) && !roles.includes(Roles.USER)) {
		throw redirect(302, '/client/dashboard');
	}
};
