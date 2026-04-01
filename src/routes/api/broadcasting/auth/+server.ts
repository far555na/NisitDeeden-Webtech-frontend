import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import apiClient, { withAuth } from '$lib/server/api-client.server';

export const POST: RequestHandler = async ({ request, cookies }) => {
    const token = cookies.get('token');

    if (!token) {
        throw error(401, 'Unauthorized: No token found');
    }
    
    let body: Record<string, any> = {};
    
    try {
        const textBody = await request.text();
        if (textBody.trim().startsWith('{')) {
            body = JSON.parse(textBody);
        } else {
            const params = new URLSearchParams(textBody);
            body = Object.fromEntries(params);
        }
    } catch (e) {
        console.error("Failed to parse request body:", e);
    }
    
    console.log("Payload to Laravel:", body);
    
    try {
        const response = await apiClient.post(
            '/broadcasting/auth', 
            body,
            {
                ...withAuth(token)
            }
        );
        console.log('✅ Laravel Broadcast Auth Success:', response.data);

        return json(response.data);

    } catch (err: any) {
        console.error('Broadcast Auth Error:', err.response?.data || err.message);
        throw error(err.response?.status || 500, 'Broadcast Auth Failed');
    }
};