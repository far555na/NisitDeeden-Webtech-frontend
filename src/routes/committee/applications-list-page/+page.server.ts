import { authedGet } from '$lib/server/auth-helpers';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const categoryId = event.url.searchParams.get('category_id');

	const endpoint = categoryId
		? `/applications/by-position?category_id=${categoryId}`
		: `/applications/by-position`;

	const resApp = await authedGet(event, endpoint);
	const resCat = await authedGet(event, `/categories`);

	return {
		applications: resApp.data.data,
		categories: resCat.data.data,
		selectedCategoryId: categoryId ?? 'all'
	};
};