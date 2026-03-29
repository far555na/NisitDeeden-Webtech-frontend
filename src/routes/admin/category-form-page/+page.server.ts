import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { authedPost } from '$lib/server/auth-helpers';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		// console.log('=== FORM DATA START ===');
		// for (const [key, value] of formData.entries()) {
		// 	if (value instanceof File) {
		// 		console.log(key, {
		// 			type: 'File',
		// 			name: value.name,
		// 			size: value.size,
		// 			contentType: value.type
		// 		});
		// 	} else {
		// 		console.log(key, value);
		// 	}
		// }
		// console.log('=== FORM DATA END ===');

		try {
			await authedPost(event, '/categories', formData);
			throw redirect(303, '/admin/category-list-page');
		} catch (err: any) {
			if (err.status === 303) throw err;

			if (err.response?.status === 422) {
				const safeData: Record<string, FormDataEntryValue> = {};

				for (const [key, value] of formData.entries()) {
					if (!(value instanceof File)) {
						safeData[key] = value;
					}
				}

				return fail(422, {
					errors: err.response.data.errors ?? {},
					data: safeData
				});
			}

			console.error(err);
			return fail(500, {
				message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล'
			});
		}
	}
};