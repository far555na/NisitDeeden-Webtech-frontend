import { authedGet } from '$lib/server/auth-helpers';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const categoryId = event.url.searchParams.get('category_id');
	const department = event.url.searchParams.get('department');

	const params = new URLSearchParams();

	if (categoryId && categoryId !== 'all') {
		params.set('category_id', categoryId);
	}

	if (department && department !== 'all') {
		params.set('department', department);
	}

	const query = params.toString();
	const endpoint = `/applications/by-position${query ? `?${query}` : ''}`;

	const resApp = await authedGet(event, endpoint);
	const resCat = await authedGet(event, `/categories`);
	const resDep = await authedGet(event, `/meta/departments`);

	return {
		applications: resApp.data.data,
		categories: resCat.data.data,
		departments: resDep.data.data,
		selectedCategoryId: categoryId ?? 'all',
		selectedDepartment: department ?? 'all'
	};
};