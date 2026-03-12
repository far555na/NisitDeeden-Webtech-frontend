import { authedGet } from '$lib/server/auth-helpers';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const categoryId = event.url.searchParams.get('category_id');
	const department = event.url.searchParams.get('department');
	const faculty = event.url.searchParams.get('faculty');

	const params = new URLSearchParams();

	if (categoryId && categoryId !== 'all') {
		params.set('category_id', categoryId);
	}

	if (department && department !== 'all') {
		params.set('department', department);
	}

	if (faculty && faculty !== 'all') {
		params.set('faculty', faculty);
	}

	const query = params.toString();
	const endpoint = `/applications/by-position${query ? `?${query}` : ''}`;

	const resApp = await authedGet(event, endpoint);
	const resCat = await authedGet(event, `/categories`);
	const resDep = await authedGet(event, `/meta/departments`);
	const resFac = await authedGet(event, `/meta/faculties`);

	return {
		applications: resApp.data.data,
		categories: resCat.data.data,
		departments: resDep.data.data,
		faculties: resFac.data.data,
		selectedCategoryId: categoryId ?? 'all',
		selectedDepartment: department ?? 'all',
		selectedFaculty: faculty ?? 'all'
	};
};
