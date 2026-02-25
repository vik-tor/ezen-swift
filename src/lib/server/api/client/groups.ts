import { apiFetchSafe, type ApiResult } from '$lib/client';
import type { PaginatedResponse, PaginationParams } from '$lib/shared/types/page/paginate';

export interface ContactGroup {
	id: number;
	name: string;
	description: string;
	memberCount: number;
	createdAt: string;
	updatedAt: string;
}

export async function fetchContactGroups(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	params?: PaginationParams
): Promise<ApiResult<PaginatedResponse<ContactGroup>>> {
	return apiFetchSafe<PaginatedResponse<ContactGroup>>(
		fetch,
		locals,
		`/contact-groups?${new URLSearchParams(params as Record<string, string>).toString()}`
	);
}

// export async function fetchContactGroupDetails(
// 	fetch: typeof globalThis.fetch,
// 	locals: App.Locals,
// 	groupId: number
// ): Promise<ContactGroup> {
// 	return apiFetch<ContactGroup>(fetch, locals, `/groups/${groupId}`);
// }

export async function createContactGroup(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	groupData: Omit<ContactGroup, 'id' | 'createdAt' | 'updatedAt' | 'memberCount'>
): Promise<ApiResult<ContactGroup>> {
	return apiFetchSafe(fetch, locals, '/contact-groups', {
		method: 'POST',
		body: JSON.stringify(groupData)
	});
}

export async function updateContactGroup(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	groupId: number,
	groupData: Partial<Omit<ContactGroup, 'id' | 'createdAt' | 'updatedAt' | 'memberCount'>>
): Promise<ApiResult<ContactGroup>> {
	return apiFetchSafe(fetch, locals, `/contact-groups/${groupId}`, {
		method: 'PUT',
		body: JSON.stringify(groupData)
	});
}

export async function deleteContactGroup(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	groupId: number
): Promise<ApiResult<void>> {
	return apiFetchSafe(fetch, locals, `/contact-groups/${groupId}`, {
		method: 'DELETE'
	});
}

export interface ContactGroupMember {
	id: number;
	name: string;
	phoneNumber: string;
	email?: string;
	createdAt: string;
}

export async function addContactGroupMembers(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	groupId: number,
	members: string[]
): Promise<ApiResult<void>> {
	return apiFetchSafe(fetch, locals, `contact-groups/${groupId}/members/add`, {
		method: 'POST',
		body: JSON.stringify({ members })
	});
}

export async function removeContactGroupMembers(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	groupId: number,
	members: string[]
): Promise<ApiResult<void>> {
	return apiFetchSafe(fetch, locals, `contact-groups/${groupId}/members/remove`, {
		method: 'POST',
		body: JSON.stringify({ members })
	});
}
