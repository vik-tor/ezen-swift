import type { SessionUser } from '$lib/shared/types/domain/user';

export class UserStore {
	private users = new Map<string, SessionUser>();

	get(token: string): SessionUser | null {
		const user = this.users.get(token);
		if (!user) return null;

		if (Date.now() > user.expiresAt) {
			this.users.delete(token);
			return null;
		}

		return user;
	}

	set(token: string, user: SessionUser) {
		this.users.set(token, user);
	}

	delete(token: string) {
		this.users.delete(token);
	}
}
