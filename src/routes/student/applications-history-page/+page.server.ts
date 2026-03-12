import type { PageServerLoad, Actions } from './$types';
import { authedDelete, authedGet } from '$lib/server/auth-helpers';
import { error, redirect, fail } from '@sveltejs/kit';

import apiClient from '$lib/server/api-client.server';

export const load: PageServerLoad = async (event) => {
	const res = await authedGet(event, `/applications/user/inactive`);
	return { applications: res.data.data };
};
