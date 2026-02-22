import type { Role } from './roles';

export type NavLink = {
	href?: string;
	label?: string;
	icon?: string;
	roles?: Role[];
	spacer?: boolean;
	separator?: boolean;
	children?: NavLink[];
};
