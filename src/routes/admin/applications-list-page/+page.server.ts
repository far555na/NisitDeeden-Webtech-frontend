import type { PageServerLoad } from './$types';
import apiClient from '$lib/server/api-client.server';

export const load: PageServerLoad = async ({ url }) => {
    try {
        const page = url.searchParams.get('page') ?? '1';
        const response = await apiClient.get(`/applications?page=${page}`); 

        if (response.status === 200) {
            return {
                applications: response.data.data,
                links: response.data.links,
                meta: response.data.meta
            };
        }
    } catch (err: any) {}
};
