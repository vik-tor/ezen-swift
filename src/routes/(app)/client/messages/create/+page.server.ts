import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { fetchContactGroups, type ContactGroup } from '$lib/server/api/client/groups';
import { fetchSenderIds } from '$lib/server/api/client/sender-ids';
import { createSMSCampaign, type SMSCampaignRequest } from '$lib/server/api/client/sms';
import { fetchMessageTemplates, type MessageTemplate } from '$lib/server/api/client/templates';
import type { SenderId } from '$lib/shared/types/domain/sender-id';

interface CampaignsPageData {
	senderIds: SenderId[];
	templates: MessageTemplate[];
	contactGroups: ContactGroup[];
	apiError?: {
		message: string;
		status: number;
	};
}

const createErrorResponse = (message: string, status: number): CampaignsPageData => ({
	senderIds: [],
	templates: [],
	contactGroups: [],
	apiError: { message, status }
});

export const load: PageServerLoad = async ({ fetch, locals }) => {
	const senderIdsRes = await fetchSenderIds(fetch, locals);
	if (!senderIdsRes.ok) {
		return createErrorResponse(senderIdsRes.error.message, senderIdsRes.error.status);
	}

	const templatesRes = await fetchMessageTemplates(fetch, locals);
	if (!templatesRes.ok) {
		return createErrorResponse(templatesRes.error.message, templatesRes.error.status);
	}

	const contactGroupsRes = await fetchContactGroups(fetch, locals);
	if (!contactGroupsRes.ok) {
		return createErrorResponse(contactGroupsRes.error.message, contactGroupsRes.error.status);
	}

	const senderIds: SenderId[] = senderIdsRes.data ?? [];
	const templates: MessageTemplate[] = templatesRes.data.content ?? [];
	const contactGroups: ContactGroup[] = contactGroupsRes.data.content ?? [];

	return { senderIds, templates, contactGroups };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const formData: SMSCampaignRequest = {
			// name: form.get('name') as string,
			senderIdId: Number(form.get('senderIdId')),
			// templateId: Number(form.get('templateId')),
			customMessage: form.get('customMessage') as string,
			contactGroupIds: (form.getAll('contactGroupIds') as string[]).map(Number),
			manualRecipients: form.get('manualRecipients') as string,
			scheduledTime: form.get('scheduledTime') as string
		};

		console.log('Form Data:', formData);

		const res = await createSMSCampaign(fetch, locals, formData);
		if (res instanceof Error) {
			return fail(400, { error: res.message });
		}
	}
};
