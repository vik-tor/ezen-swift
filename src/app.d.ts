// See https://svelte.dev/docs/kit/types#app.d.ts

import type { SessionUser } from '$lib/shared/types/user';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: SessionUser; // Replace 'any' with your actual User type
			isAuthenticated: boolean;
			accessToken: string | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
