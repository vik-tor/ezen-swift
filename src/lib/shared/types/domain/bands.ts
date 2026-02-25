export interface RateHistory {
	newRateSafaricom: number;
	newRateAirtel: number;
	triggeringTopupAmount: number;
	changedBy: string;
	changeReason: string;
	changeType: string;
	changedAt: string;
}

export interface CurrentRatesWithHistory {
	currentRateSafaricom: number;
	currentRateAirtel: number;
	highestSingleTopup: number;
	bestRateUnlockedAt: string;
	overriddenBy: string;
	overrideReason: string;
	bandOverridesEnabled: boolean;
	auditHistory: RateHistory[];
	manuallyOverridden: boolean;
}
