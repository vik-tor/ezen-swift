import { apiFetchSafe, type ApiResult } from '$lib/client';
import type { PaginationParams, PaginatedResponse } from '$lib/shared/types/page/paginate';
import type { Role } from '$lib/shared/types/domain/roles';

export interface AuthUser {
	id: number;
	username: string;
	email: string;
	roles: Role[];
	createdAt: string;
	updatedAt: string;
	balance?: number | null; // Add balance field to User interface
}

export interface User {
	id: number;
	username: string;
	email: string;
	enabled: boolean;
	locked: boolean;
	failedAttempts: number;
	lockTime?: string;
	roles: Role[];
	clientCode: string;
	hasApprovedSenderId?: boolean;
	createdAt: string;
	walletBalance?: number;
}

export interface RoleData {
	id: number;
	name: string;
}

export async function fetchUsers(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	params?: PaginationParams & { role?: string; search?: string }
): Promise<ApiResult<PaginatedResponse<User>>> {
	return apiFetchSafe<PaginatedResponse<User>>(
		fetch,
		locals,
		`/admin/users?${new URLSearchParams(params as Record<string, string>).toString()}`
	);
}

// export async function deleteUser(
// 	fetch: typeof globalThis.fetch,
// 	locals: App.Locals,
// 	userId: number
// ): Promise<void> {
// 	await apiFetch(fetch, locals, `/admin/users/${userId}`, {
// 		method: 'DELETE'
// 	});
// }

export async function assignUserRole(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	userId: number,
	newRole: Role
): Promise<ApiResult<void>> {
	return apiFetchSafe(fetch, locals, `/admin/roles/assign`, {
		method: 'POST',
		body: JSON.stringify({ userId: userId, roleName: newRole })
	});
}

export async function unassignUserRole(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	userId: number,
	role: string
): Promise<ApiResult<void>> {
	return apiFetchSafe(fetch, locals, `/admin/roles/unassign`, {
		method: 'POST',
		body: JSON.stringify({ userId: userId, roleName: role })
	});
}

// export async function createUser(
// 	fetch: typeof globalThis.fetch,
// 	locals: App.Locals,
// 	username: string,
// 	email: string,
// 	password: string,
// 	role: 'admin' | 'user'
// ): Promise<User> {
// 	return apiFetch<User>(fetch, locals, '/admin/users', {
// 		method: 'POST',
// 		body: JSON.stringify({ username, email, password, role })
// 	});
// }

export function lockUser(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	userId: number,
	reason: string
): Promise<ApiResult<void>> {
	return apiFetchSafe(fetch, locals, `/admin/users/${userId}/lock`, {
		method: 'POST',
		body: JSON.stringify({ reason: reason })
	});
}

export function unlockUser(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	userId: number
): Promise<ApiResult<void>> {
	return apiFetchSafe(fetch, locals, `/admin/unlock/${userId}`, {
		method: 'POST'
	});
}

export function exportUsers(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	format: 'pdf' | 'excel',
	params?: { role?: string; search?: string }
): Promise<ApiResult<string>> {
	return apiFetchSafe(
		fetch,
		locals,
		`/admin/users/export/${format}?${new URLSearchParams(params as Record<string, string>).toString()}`,
		{
			method: 'GET'
		}
	);
}

export async function fetchRoles(
	fetch: typeof globalThis.fetch,
	locals: App.Locals
): Promise<ApiResult<RoleData[]>> {
	return apiFetchSafe<RoleData[]>(fetch, locals, '/admin/roles');
}
