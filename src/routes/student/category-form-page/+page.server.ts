import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { authedGet, authedPost } from '$lib/server/auth-helpers';

export const load: PageServerLoad = async (event) => {
	const category = event.url.searchParams.get('category');
	const res = await authedGet(event, `/categories/${category}`);
	return { category: res.data.data };
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		try {
			await authedPost(event, '/applications', formData);
			throw redirect(303, '/student/homepage');

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

// export const actions: Actions = {

// 	default: async ({ request, cookies }) => {
//         const token = cookies.get('token');

//         if (!token) {
//             throw redirect(303, '/login');
//         }

// 		const formData = await request.formData();

// 		try {
// 			const response = await apiClient.post('/applications', formData, withAuth(token));

// 			throw redirect(303, `/student/applications-history-page`);
// 		} catch (error: any) {
// 			if (error.status === 303) throw error;

//             if (error.response?.status === 401 || error.response?.status === 403) {
// 				cookies.delete('token', { path: '/' });
// 				throw redirect(303, '/login');
// 			}

// 			if (error.response?.status === 422) {
// 				const data = Object.fromEntries(formData);

// 				for (const key in data) {
// 					if (data[key] instanceof File) {
// 						delete data[key];
// 					}
// 				}

// 				return fail(422, {
// 					errors: error.response.data.errors,
// 					data: data
// 				});
// 			}
// 			console.log(error);
// 			return fail(500, { message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
// 		}
// 	}
// };
