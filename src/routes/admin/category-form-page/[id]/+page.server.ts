import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { authedGet, authedPost } from '$lib/server/auth-helpers';

export const load: PageServerLoad = async (event) => {
	const id = event.params.id;

	const res = await authedGet(event, `/categories/${id}`);

	console.log('=== LOAD CATEGORY STATUS ===');
	console.log('status:', res.status);
	console.log('data:', res.data);

	return { category: res.data.data };
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const id = event.params.id;

		formData.append('_method', 'PUT');

		// console.log('=== FORM DATA START ===');
		for (const [key, value] of formData.entries()) {
			if (value instanceof File) {
				console.log(key, {
					type: 'File',
					name: value.name,
					size: value.size,
					contentType: value.type
				});
			} else {
				console.log(key, value);
			}
		}
		// console.log('=== FORM DATA END ===');

		// console.log('=== UPDATE REQUEST INFO ===');
		// console.log('category id:', id);
		// console.log('method override:', formData.get('_method'));

		try {
			const res = await authedPost(event, `/categories/${id}`, formData);

			// console.log('=== UPDATE SUCCESS ===');
			// console.log('status:', res.status);
			// console.log('response data:', res.data);

			throw redirect(303, '/admin/category-list-page');
		} catch (error: any) {
			// console.log('=== UPDATE ERROR ===');
			// console.log('status:', error?.response?.status);
			// console.log('response data:', error?.response?.data);
			// console.log('message:', error?.message);

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
					data
				});
			}

			return fail(500, {
				message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล',
				status: error?.response?.status ?? 500
			});
		}
	}
};