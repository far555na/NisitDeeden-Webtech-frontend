import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import apiClient from '$lib/server/api-client.server';

export const load: PageServerLoad = async ({ url }) => {
	try {
		const category = url.searchParams.get('category');
		const response = await apiClient.get(`/categories/${category}`);

		if (response.status === 200) {
			return {
				category: response.data.data
			};
		}
	} catch (err: any) {}
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		try {
			// ✅ Debug: ดูทุก field ที่ถูกส่งมา
			// for (const [key, value] of formData.entries()) {
			// 	if (value instanceof File) {
			// 		console.log('[FORM]', key, {
			// 			name: value.name,
			// 			type: value.type,
			// 			size: value.size
			// 		});
			// 	} else {
			// 		console.log('[FORM]', key, value);
			// 	}
			// }

			// ถ้าอยากดูเป็น object (เฉพาะ string)
			// console.log(
			// 	'[FORM object]',
			// 	Object.fromEntries([...formData.entries()].filter(([, v]) => !(v instanceof File)))
			// );

			const response = await apiClient.post('/applications', formData);

			// const newArtistId = response.data.data.id;

			throw redirect(303, `/student/applications-history-page`);
		} catch (error: any) {
			// console.error('❌ ACTION ERROR:', error);

			// // ถ้าเป็น axios error
			// console.error('❌ axios response status:', error?.response?.status);
			// console.error('❌ axios response data:', error?.response?.data);

			// return fail(500, { message: error?.message ?? 'Internal Server Error' });
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
