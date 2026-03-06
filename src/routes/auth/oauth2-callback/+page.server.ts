import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import apiClient, { withAuth } from '$lib/server/api-client.server';

export const load: PageServerLoad = async ({ url, cookies }) => {
	const token = url.searchParams.get('token');

	if (!token) {
		throw redirect(303, '/auth/login?error=no_token');
	}

	try {
		cookies.set('token', token, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7 // 7 วัน
		});

		const response = await apiClient.get('/user', withAuth(token));
		const user = response.data;

		const userBase64 = Buffer.from(JSON.stringify(user)).toString('base64');
		cookies.set('user_info', userBase64, {
			path: '/',
			maxAge: 60 * 60 * 24 * 7
		});
	} catch (err: any) {
		console.error('OAuth Sync Error:', err.response?.data || err.message);
		cookies.delete('token', { path: '/' });
		throw error(500, 'ไม่สามารถดึงข้อมูลผู้ใช้จากระบบได้');
	}

	throw redirect(303, '/student/homepage');
};
