import type { PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { authedGet, authedPost } from '$lib/server/auth-helpers';
import apiClient from '$lib/server/api-client.server';

export const load: PageServerLoad = async (event) => {
	const [positionsRes, facultiesRes, departmentsRes] = await Promise.all([
		apiClient.get('/meta/positions'),
		apiClient.get('/meta/faculties'),
		apiClient.get('/meta/departments')
	]);
	const id = event.params.id;

	const res = await authedGet(event, `/users/${id}`);
	return {
		user: res.data.data,
		positions: positionsRes.data.data,
		faculties: facultiesRes.data.data,
		departments: departmentsRes.data.data
	};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const id = event.params.id;

		formData.set('_method', 'PUT');

		await authedPost(event, `/users/${id}`, formData);

		// redirect ตรง ๆ ไม่ต้อง try/catch
		throw redirect(303, '/admin/users-list-page');
	}
};