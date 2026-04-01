import type { Actions, PageServerLoad } from './$types';
import { authedDelete, authedGet } from '$lib/server/auth-helpers';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const page = event.url.searchParams.get('page') ?? '1';
	const res = await authedGet(event, `/users?page=${page}`);
	return { users: res.data.data, links: res.data.links, meta: res.data.meta };
};
import { fail, redirect } from '@sveltejs/kit';

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
			const message =
				err?.response?.data?.message ||
				err?.data?.message;

			return fail(err?.status ?? 500, { message });
		}
	}
};
