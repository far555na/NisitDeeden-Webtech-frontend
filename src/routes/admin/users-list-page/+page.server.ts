import type { PageServerLoad } from './$types';
import apiClient from '$lib/server/api-client.server';
import { metadata } from '@iconify-json/mdi/index.js';

export const load: PageServerLoad = async ({ url }) => {
	try {
		const page = url.searchParams.get('page') ?? '1';
		const response = await apiClient.get(`/users?page=${page}`);

		if (response.status === 200) {
			return {
				users: response.data.data ?? [],
				links: response.data.links ?? {},
				meta: response.data.meta ?? {}
			};
		}
	} catch (err) {
		console.error(err);
	}

	return {
		users: [],
		links: {},
		meta: {
			current_page: 1,
			last_page: 1
		}
	};
};
