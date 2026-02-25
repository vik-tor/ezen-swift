import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { Roles } from '$lib/shared/types/domain/roles';

export const load: LayoutLoad = async ({ parent }) => {
	const { roles } = await parent();

	console.log('Roles in client layout:', roles);

	if (!roles.includes(Roles.CLIENT)) {
		throw redirect(302, '/admin/dashboard');
	}
};
