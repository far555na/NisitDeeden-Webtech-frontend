import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import apiClient, { withAuth } from '$lib/server/api-client.server';

export function requireAuth(event: RequestEvent) {
	if (!event.locals.token) throw redirect(303, '/login');
	return event.locals.token;
}

export function handleAuthError(event: RequestEvent, err: any) {
	const status = err?.response?.status;

	console.log('AUTH ERROR', {
		status,
		url: err?.config?.url,
		method: err?.config?.method,
		response: err?.response?.data
	});
	if (status === 401 || status === 403) {
		event.cookies.delete('token', { path: '/' });
		event.cookies.delete('user_info', { path: '/' });
		throw redirect(303, '/login');
	}
}

export async function authedGet<T = any>(event: RequestEvent, url: string) {
	const token = requireAuth(event);
	try {
		return await apiClient.get<T>(url, withAuth(token));
	} catch (err) {
		handleAuthError(event, err);
		throw err;
	}
}

export async function authedPost<T = any>(event: RequestEvent, url: string, data: any) {
	const token = requireAuth(event);
	try {
		return await apiClient.post<T>(url, data, withAuth(token));
	} catch (err) {
		handleAuthError(event, err);
		throw err;
	}
}

export async function authedDelete<T = any>(event: RequestEvent, url: string) {
	const token = requireAuth(event);

	try {
		return await apiClient.delete<T>(url, withAuth(token));
	} catch (err) {
		handleAuthError(event, err);
		throw err;
	}
}

export async function authedPatch<T = any>(event: RequestEvent, url: string, data: any) {
	const token = requireAuth(event);
	try {
		return await apiClient.patch<T>(url, data, withAuth(token));
	} catch (err) {
		handleAuthError(event, err);
		throw err;
	}
}
