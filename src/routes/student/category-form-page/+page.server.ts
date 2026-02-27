import type { PageServerLoad } from './$types';
import apiClient from '$lib/server/api-client.server';

export const load: PageServerLoad = async ({ url }) => {
    try {
        const category = url.searchParams.get('category');
        const response = await apiClient.get(`/categories/${category}`); 

        if (response.status === 200) {
            return {
                category: response.data.data,
            };
        }
    } catch (err: any) {}
};
