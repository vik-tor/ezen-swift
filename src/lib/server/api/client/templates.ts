import { apiFetchSafe, type ApiResult } from '$lib/client';
import type { PaginatedResponse, PaginationParams } from '$lib/shared/types/page/paginate';
import type { SenderIdCategory } from '$lib/shared/types/domain/sender-id';

export interface MessageTemplate {
	id: number;
	name: string;
	content: string;
	category: SenderIdCategory;
	createdAt: string;
	updatedAt: string;
	default: boolean;
}

export async function fetchMessageTemplates(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	params?: PaginationParams
): Promise<ApiResult<PaginatedResponse<MessageTemplate>>> {
	return apiFetchSafe<PaginatedResponse<MessageTemplate>>(
		fetch,
		locals,
		`/message-templates?${new URLSearchParams(params as Record<string, string>).toString()}`
	);
}

// export async function fetchMessageTemplateDetails(
// 	fetch: typeof globalThis.fetch,
// 	locals: App.Locals,
// 	templateId: number
// ): Promise<MessageTemplate> {
// 	return apiFetch<MessageTemplate>(fetch, locals, `/templates/${templateId}`);
// }

export async function createMessageTemplate(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	templateData: Omit<MessageTemplate, 'id' | 'default' | 'createdAt' | 'updatedAt'> & {
		isDefault: boolean;
	}
): Promise<ApiResult<MessageTemplate>> {
	return apiFetchSafe(fetch, locals, '/message-templates', {
		method: 'POST',
		body: JSON.stringify(templateData)
	});
}

export async function updateMessageTemplate(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	templateId: number,
	templateData: Partial<Omit<MessageTemplate, 'id' | 'default' | 'createdAt' | 'updatedAt'>> & {
		isDefault: boolean;
	}
): Promise<ApiResult<MessageTemplate>> {
	return apiFetchSafe(fetch, locals, `/message-templates/${templateId}`, {
		method: 'PUT',
		body: JSON.stringify(templateData)
	});
}

export async function deleteMessageTemplate(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	templateId: number
): Promise<ApiResult<void>> {
	return apiFetchSafe(fetch, locals, `/message-templates/${templateId}`, {
		method: 'DELETE'
	});
}
