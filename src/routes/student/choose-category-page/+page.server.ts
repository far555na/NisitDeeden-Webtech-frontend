import type { PageServerLoad } from './$types';
import { authedGet } from '$lib/server/auth-helpers';

export const load: PageServerLoad = async (event) => {
	const res = await authedGet(event, `/categories`);
	return { categories: res.data.data };
};
