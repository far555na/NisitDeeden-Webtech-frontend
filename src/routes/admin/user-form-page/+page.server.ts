import type { PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { authedGet, authedPost } from '$lib/server/auth-helpers';
import apiClient from '$lib/server/api-client.server';

export const load: PageServerLoad = async () => {
	try {
		const [positionsRes, facultiesRes, departmentsRes] = await Promise.all([
			apiClient.get('/meta/positions'),
			apiClient.get('/meta/faculties'),
			apiClient.get('/meta/departments')
		]);

		return {
			positions: positionsRes.data.data,
			faculties: facultiesRes.data.data,
			departments: departmentsRes.data.data
		};
	} catch (err: any) {
		console.log('LOAD META ERROR:', err?.response?.data || err);
		throw error(500, 'ไม่พบข้อมูล');
	}
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		const photo = formData.get('photo');
		if (photo instanceof File && photo.size === 0) {
			formData.delete('photo');
		}

		console.log('=== FORM DATA START ===');
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
		console.log('=== FORM DATA END ===');

		try {
			await authedPost(event, '/users', formData);

			throw redirect(303, '/admin/users-list-page');
		} catch (error: any) {
			if (error.status === 303) throw error;

			console.log('STATUS:', error?.response?.status);
			console.log('ERROR DATA:', error?.response?.data);

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

			return fail(500, { message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
		}
	}
};
