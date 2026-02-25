import type { Role } from './roles';

export type SessionUser = {
	id: number;
	username: string;
	email: string;
	roles: Role[];
	isActive: boolean;
	expiresAt: number;
	hasWallet: boolean;
	walletBalance: number;
	hasApprovedSenderId: boolean;
};
