import type { Actions, PageServerLoad } from './$types';
import { authedDelete, authedGet } from '$lib/server/auth-helpers';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const page = event.url.searchParams.get('page') ?? '1';
	const q = event.url.searchParams.get('q') ?? '';
	const role = event.url.searchParams.get('role') ?? '';
	const faculty = event.url.searchParams.get('faculty') ?? '';
	const department = event.url.searchParams.get('department') ?? '';
	const position = event.url.searchParams.get('position') ?? '';

	const params = new URLSearchParams();
	params.set('page', page);

	if (q) params.set('q', q);
	if (role && role !== 'all') params.set('role', role);
	if (faculty && faculty !== 'all') params.set('faculty', faculty);
	if (department && department !== 'all') params.set('department', department);
	if (position && position !== 'all') params.set('position', position);

	const [usersRes, facultiesRes, departmentsRes, positionsRes] = await Promise.all([
		authedGet(event, `/admin/users?${params.toString()}`),
		authedGet(event, '/meta/faculties'),
		authedGet(event, '/meta/departments'),
		authedGet(event, '/meta/positions')
	]);

	return {
		users: usersRes.data.data ?? [],
		links: usersRes.data.links,
		meta: usersRes.data.meta,
		faculties: facultiesRes.data.data ?? facultiesRes.data ?? [],
		departments: departmentsRes.data.data ?? departmentsRes.data ?? [],
		positions: positionsRes.data.data ?? positionsRes.data ?? [],

		filters: {
			q,
			role,
			faculty,
			department,
			position
		}
	};
};

export const actions: Actions = {
	deleteUser: async (event) => {
		const formData = await event.request.formData();
		const id = formData.get('id');

		if (!id) {
			return fail(400, { message: 'Missing user id' });
		}

		try {
			await authedDelete(event, `/users/${id}`);
			throw redirect(303, '/admin/users-list-page');
		} catch (err: any) {
			const message = err?.response?.data?.message || err?.data?.message || 'Delete failed';
			return fail(err?.status ?? 500, { message });
		}
	}
};