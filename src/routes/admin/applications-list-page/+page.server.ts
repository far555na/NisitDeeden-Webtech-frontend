import type { PageServerLoad } from './$types';
import { authedGet } from '$lib/server/auth-helpers';

export const load: PageServerLoad = async (event) => {
	const page = event.url.searchParams.get('page') ?? '1';
	const res = await authedGet(event, `/applications?page=${page}`);
	return { applications: res.data.data, links: res.data.links, meta: res.data.meta };
};
