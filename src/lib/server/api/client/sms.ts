import { apiFetchSafe, type ApiResult } from '$lib/client';
import type { PaginatedResponse, PaginationParams } from '$lib/shared/types/page/paginate';

export type SMSCampaignStatus = 'DRAFT' | 'SENT' | 'FAILED';

export interface SMSCampaign {
	id: number;
	name: string;
	senderIdName: string;
	message: string;
	totalRecipients: number;
	status: SMSCampaignStatus;
	scheduledTime: string;
	createdAt: string;
	updatedAt: string;
	successfulDeliveries: number;
	failedDeliveries: number;
	totalCost: number;
	failureReason: string;
	recipients: string[];
}

export interface SMSCampaignRequest {
	name: string;
	senderIdId: number;
	templateId: number;
	customMessage: string;
	contactGroupIds: number[];
	manualRecipients: string[];
	scheduledTime: string;
}

export interface MessageRecipients {
	allRecipients: string[];
	totalCount: number;
}

export async function fetchSMSCampaigns(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	params?: PaginationParams
): Promise<ApiResult<PaginatedResponse<SMSCampaign>>> {
	return apiFetchSafe<PaginatedResponse<SMSCampaign>>(
		fetch,
		locals,
		`/sms/campaigns?${new URLSearchParams(params as Record<string, string>).toString()}`
	);
}

export async function fetchSMSCampaignDetails(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	messageId: number
): Promise<ApiResult<SMSCampaign>> {
	return apiFetchSafe<SMSCampaign>(fetch, locals, `/sms/campaigns/${messageId}`);
}

export async function createSMSCampaign(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	messageData: SMSCampaignRequest
): Promise<ApiResult<SMSCampaign>> {
	return apiFetchSafe<SMSCampaign>(fetch, locals, '/sms/campaigns', {
		method: 'POST',
		body: JSON.stringify(messageData)
	});
}

export async function cancelScheduledSMSCampaign(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	messageId: number
): Promise<ApiResult<void>> {
	return apiFetchSafe(fetch, locals, `/sms/campaigns/${messageId}/cancel`, {
		method: 'POST'
	});
}

export async function previewMessageRecipients(
	fetch: typeof globalThis.fetch,
	locals: App.Locals,
	messageData: { contactGroupIds: string[]; manualRecipients: string[] }
): Promise<ApiResult<MessageRecipients>> {
	return apiFetchSafe<MessageRecipients>(fetch, locals, '/sms/campaigns/preview-recipients', {
		method: 'POST',
		body: JSON.stringify(messageData)
	});
}
