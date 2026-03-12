import type { Actions, PageServerLoad } from './$types';

import {
	assignUserRole,
	exportUsers,
	fetchRoles,
	fetchUsers,
	lockUser,
	unassignUserRole,
	unlockUser
} from '$lib/server/api/admin/users';
import {
	generateUsersWallet,
	refundUsersWallet,
	resetUsersWallet
} from '$lib/server/api/admin/wallets';
import type { Role } from '$lib/shared/types';
import type { PaginationContext } from '$lib/shared/types/page/paginate';

export const load: PageServerLoad = async ({ fetch, locals }) => {
	const usersRes = await fetchUsers(fetch, locals);
	if (!usersRes.ok) {
		return {
			users: [],
			apiError: { message: usersRes.error?.message, status: usersRes.error?.status }
		};
	}

	const rolesRes = await fetchRoles(fetch, locals);
	if (!rolesRes.ok) {
		return {
			roles: [],
			apiError: { message: rolesRes.error?.message, status: rolesRes.error?.status }
		};
	}

	const roles = rolesRes.data;
	const users = usersRes.data.content;
	const context: PaginationContext = {
		totalElements: usersRes.data.totalElements,
		totalPages: usersRes.data.totalPages,
		first: usersRes.data.first,
		last: usersRes.data.last,
		size: usersRes.data.size,
		number: usersRes.data.number,
		numberOfElements: usersRes.data.numberOfElements,
		empty: usersRes.data.empty,
		pageNumber: usersRes.data.pageable.pageNumber,
		pageSize: usersRes.data.pageable.pageSize,
		offset: usersRes.data.pageable.offset
	};

	return { roles, users, context };
};

export const actions: Actions = {
	lock: async ({ request, locals }) => {
		const form = await request.formData();
		const formData = {
			reason: form.get('reason') as string,
			userId: form.get('userId') as unknown as number
		};

		await lockUser(fetch, locals, formData.userId, formData.reason);
	},
	unlock: async ({ request, locals }) => {
		const form = await request.formData();
		const formData = {
			userId: form.get('userId') as unknown as number
		};

		await unlockUser(fetch, locals, formData.userId);
	},
	export: async ({ request, locals }) => {
		const form = await request.formData();
		const formData = {
			format: form.get('format') as 'pdf' | 'excel'
		};

		await exportUsers(fetch, locals, formData.format);
	},
	assignRole: async ({ request, locals }) => {
		const form = await request.formData();
		const formData = {
			role: form.get('role') as Role,
			userId: form.get('userId') as unknown as number
		};

		await assignUserRole(fetch, locals, formData.userId, formData.role);
	},
	unassignRole: async ({ request, locals }) => {
		const form = await request.formData();
		const formData = {
			role: form.get('role') as Role,
			userId: form.get('userId') as unknown as number
		};

		await unassignUserRole(fetch, locals, formData.userId, formData.role);
	},
	refund: async ({ request, locals }) => {
		const form = await request.formData();
		const formData = {
			amount: form.get('amount') as unknown as number,
			description: form.get('description') as string,
			userId: form.get('userId') as unknown as number
		};

		await refundUsersWallet(fetch, locals, formData);
	},
	resetWallet: async ({ request, locals }) => {
		const form = await request.formData();
		const formData = {
			userId: form.get('userId') as unknown as number
		};

		await resetUsersWallet(fetch, locals, formData.userId);
	},
	generateWallet: async ({ request, locals }) => {
		const form = await request.formData();
		const formData = {
			userId: form.get('userId') as unknown as number
		};

		await generateUsersWallet(fetch, locals, formData.userId);
	}
};
