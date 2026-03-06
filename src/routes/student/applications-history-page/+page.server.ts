import type { PageServerLoad, Actions } from './$types';
import { authedDelete, authedGet } from '$lib/server/auth-helpers';
import { error, redirect, fail } from '@sveltejs/kit';

import apiClient from '$lib/server/api-client.server';

export const load: PageServerLoad = async (event) => {
	const res = await authedGet(event, `/my-applications`);
	return { applications: res.data.data };
};

export const actions: Actions = {
	deleteApplication: async (event) => {
		const formData = await event.request.formData();
		const id = formData.get('id');

		if (!id) {
			return fail(400, { message: 'Missing application id' });
		}

		await authedDelete(event, `/applications/${id}`);

		throw redirect(303, '/student/applications-history-page');
	}
};
