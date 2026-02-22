import { apiFetchSafe, type ApiResult } from '$lib/client';

export interface UserProfile {
	id: number;
	username: string;
	email: string;
	roles: string[];
	hasWallet: boolean;
	clientCode: string;
	walletBalance: number;
	hasApprovedSenderId: boolean;
	createdAt: string;
	updatedAt: string;
	failedAttempts: number;
	lockTime: string;
	locked: boolean;
}

export async function fetchUserProfile(
	fetch: typeof globalThis.fetch,
	locals: App.Locals
): Promise<ApiResult<UserProfile>> {
	return apiFetchSafe<UserProfile>(fetch, locals, '/user/profile');
}

export async function updateUserProfile(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	profileData: Partial<Pick<UserProfile, 'username' | 'email'>>
): Promise<ApiResult<void>> {
	return apiFetchSafe(fetch, locals, '/userprofile', {
		method: 'PUT',
		body: JSON.stringify(profileData)
	});
}

export async function resetUserPassword(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	currentPassword: string,
	newPassword: string
): Promise<ApiResult<void>> {
	return await apiFetchSafe(fetch, locals, '/user/profile/password', {
		method: 'PUT',
		body: JSON.stringify({ currentPassword, newPassword })
	});
}
