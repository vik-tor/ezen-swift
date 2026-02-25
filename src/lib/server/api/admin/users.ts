import { apiFetch } from '$lib/client';
import type { PaginationParams, PaginatedResponse } from '$lib/shared/types/page/paginate';
import type { Role } from '$lib/shared/types/domain/roles';

export interface User {
	id: number;
	username: string;
	email: string;
	role: 'admin' | 'user';
	createdAt: string;
	updatedAt: string;
}

export interface RoleData {
	id: number;
	name: string;
}

export async function fetchUsers(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	params: PaginationParams & { role?: string; search?: string }
): Promise<PaginatedResponse<User>> {
	return apiFetch<PaginatedResponse<User>>(
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
): Promise<void> {
	await apiFetch(fetch, locals, `/admin/roles/assign`, {
		method: 'POST',
		body: JSON.stringify({ userId: userId, roleName: newRole })
	});
}

export async function unassignUserRole(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	userId: number,
	role: string
): Promise<void> {
	await apiFetch(fetch, locals, `/admin/roles/unassign`, {
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
): Promise<void> {
	return apiFetch(fetch, locals, `/admin/users/${userId}/lock`, {
		method: 'POST',
		body: JSON.stringify({ reason: reason })
	});
}

export function unlockUser(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	userId: number
): Promise<void> {
	return apiFetch(fetch, locals, `/admin/unlock/${userId}`, {
		method: 'POST'
	});
}

export function exportUsers(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	format: 'pdf' | 'excel',
	params: { role?: string; search?: string }
): Promise<Blob> {
	return apiFetch<Blob>(
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
): Promise<RoleData[]> {
	return apiFetch<RoleData[]>(fetch, locals, '/admin/roles');
}
