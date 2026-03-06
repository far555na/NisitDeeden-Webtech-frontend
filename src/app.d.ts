// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			token: string | null;
			user: {
				name: string;
				email: string;
				role: 'STUDENT' | 'COMMITTEE' | 'ADMIN';
			} | null; // ถ้าเป็น null แปลว่ายังไม่ได้ล็อกอิน
		}
		// interface PageData {}D
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
