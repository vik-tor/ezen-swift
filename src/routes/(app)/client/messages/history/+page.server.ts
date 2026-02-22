import type { PageServerLoad } from './$types';

import { fetchSMSCampaigns, type SMSCampaign } from '$lib/server/api/client/sms';

interface CampaignsPageData {
	campaigns: SMSCampaign[];
	apiError?: {
		message: string;
		status: number;
	};
}

const createErrorResponse = (message: string, status: number): CampaignsPageData => ({
	campaigns: [],
	apiError: { message, status }
});

export const load: PageServerLoad = async ({ fetch, locals }) => {
	const campaignsRes = await fetchSMSCampaigns(fetch, locals);
	if (!campaignsRes.ok) {
		return createErrorResponse(campaignsRes.error.message, campaignsRes.error.status);
	}

	const campaigns: SMSCampaign[] = campaignsRes.data.content ?? [];

	return { campaigns };
};
