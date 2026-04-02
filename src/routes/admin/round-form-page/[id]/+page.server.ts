import type { PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { authedGet, authedPost } from '$lib/server/auth-helpers';
import apiClient from '$lib/server/api-client.server';

export const load: PageServerLoad = async (event) => {
	const id = event.params.id;

	const res = await authedGet(event, `/rounds/${id}`);
	return { round: res.data.data };
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
        const id = event.params.id;
        
        formData.append('_method', 'PUT');

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
			await authedPost(event, `/rounds/${id}`, formData);
			throw redirect(303, '/admin/round-list-page');
		} catch (error: any) {
			if (error.status === 303) throw error;

			if (error.response?.status === 422) {
				const data = Object.fromEntries(formData);

				for (const key in data) {
					if (data[key] instanceof File) {
						delete data[key];
					}
				}

				return fail(422, {
					errors: error.response.data.errors,
					data: data
				});
			}
			console.log(error);
			return fail(500, { message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
		}
	}
};
