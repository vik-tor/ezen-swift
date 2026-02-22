export const Roles = {
	ADMIN: 'ADMIN',
	USER: 'USER',
	CLIENT: 'CLIENT'
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];
