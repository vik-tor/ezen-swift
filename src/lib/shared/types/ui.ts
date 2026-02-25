import type { Role } from './domain/roles';

export type NavLink = {
	href?: string;
	label?: string;
	icon?: string;
	roles?: Role[];
	spacer?: boolean;
	separator?: boolean;
	children?: NavLink[];
};

export interface SelectOptions<T = unknown> {
	name: string | number;
	value: T;
	selected?: boolean;
}
