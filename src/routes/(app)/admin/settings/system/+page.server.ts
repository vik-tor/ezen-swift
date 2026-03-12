import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { fetchUserProfile, updateUserProfile, type UserProfile } from '$lib/server/api/profile';

export const load: PageServerLoad = async ({ fetch, locals }) => {
	const profileRes = await fetchUserProfile(fetch, locals);

	if (!profileRes.ok) {
		return {
			profile: {} as UserProfile,
			apiError: {
				message: profileRes.error.message,
				status: profileRes.error.status
			}
		};
	}

	const profile: UserProfile = profileRes.data ?? {};
	return { profile };
};

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		const form = await request.formData();
		const formData = {
			username: form.get('username') as string,
			email: form.get('email') as string
		};
		const res = await updateUserProfile(fetch, locals, formData);
		if (res instanceof Error) {
			return fail(400, { error: res.message });
		}
	}
};
