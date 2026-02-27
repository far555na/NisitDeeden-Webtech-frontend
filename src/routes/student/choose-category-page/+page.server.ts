import type { PageServerLoad } from './$types';
import apiClient from '$lib/server/api-client.server';

export const load: PageServerLoad = async () => {
    try {
        const response = await apiClient.get(`/categories`); 

        if (response.status === 200) {
            return {
                categories: response.data.data,
            };
        }
    } catch (err: any) {}
};
