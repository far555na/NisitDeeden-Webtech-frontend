import type { PageServerLoad } from './$types';
import { authedGet } from '$lib/server/auth-helpers';

export const load: PageServerLoad = async (event) => {
	const page = event.url.searchParams.get('page') ?? '1';
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

	params.set('page', page);

	const query = params.toString();
	const endpoint = `/applications${query ? `?${query}` : ''}`;

	const [resApp, resCat, resDep, resFac] = await Promise.all([
		authedGet(event, endpoint),
		authedGet(event, '/categories'),
		authedGet(event, '/meta/departments'),
		authedGet(event, '/meta/faculties')
	]);

	return {
		applications: resApp.data.data,
		links: resApp.data.links,
		meta: resApp.data.meta,
		categories: resCat.data.data,
		departments: resDep.data.data,
		faculties: resFac.data.data,
		selectedCategoryId: categoryId ?? 'all',
		selectedDepartment: department ?? 'all',
		selectedFaculty: faculty ?? 'all'
	};
};