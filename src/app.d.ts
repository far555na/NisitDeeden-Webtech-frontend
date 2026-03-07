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
				role: 'STUDENT' | 'COMMITTEE' | '';
				// position: 'dean' | 'associate_dean' | 'head_of_department' | 'committee_member' | 'student';
			} | null; // ถ้าเป็น null แปลว่ายังไม่ได้ล็อกอิน
		}
		// interface PageData {}D
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
