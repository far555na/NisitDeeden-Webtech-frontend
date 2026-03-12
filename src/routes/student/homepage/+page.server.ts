import type { PageServerLoad } from './$types';
import { authedGet } from '$lib/server/auth-helpers';

export const load: PageServerLoad = async (event) => {
	const endpoint = `/applications/user/active`;

	try {
		const res = await authedGet(event, endpoint);
		const rawData = res.data.data;

		const application =
			Array.isArray(rawData) ? (rawData.length > 0 ? rawData[0] : null) : rawData ?? null;

		return { application };
	} catch (err: any) {
		const status = err?.response?.status;
		const responseData = err?.response?.data;

		console.error('LOAD ERROR');
		console.error('message:', err?.message);
		console.error('status:', status);
		console.error('response data:', responseData);

		if (
			status === 404 &&
			responseData?.message === 'No applications found for this user.'
		) {
			return { application: null };
		}

		throw err;
	}
};