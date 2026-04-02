import type { PageServerLoad } from './$types';
import { authedGet } from '$lib/server/auth-helpers';

export const load: PageServerLoad = async (event) => {
	const endpoint = `/applications/user/active`;

	try {
		const [applicationRes, userRes, roundsRes] = await Promise.all([
			authedGet(event, endpoint),
			authedGet(event, `/me`),
			authedGet(event, `/rounds`)
		]);

		const rawData = applicationRes.data.data;

		const application = Array.isArray(rawData)
			? rawData.length > 0
				? rawData[0]
				: null
			: (rawData ?? null);

		const rounds = roundsRes?.data?.data ?? [];
		const openRound = rounds.find((round: any) => round.status === 'OPEN') ?? null;
		const hasOpenRound = !!openRound;

		return {
			application,
			user: userRes.data.data,
			hasOpenRound,
			openRound
		};
	} catch (err: any) {
		const status = err?.response?.status;
		const responseData = err?.response?.data;

		console.error('LOAD ERROR');
		console.error('message:', err?.message);
		console.error('status:', status);
		console.error('response data:', responseData);

		if (status === 404 && responseData?.message === 'No applications found for this user.') {
			try {
				const [userRes, roundsRes] = await Promise.all([
					authedGet(event, `/me`),
					authedGet(event, `/application-rounds`) // เปลี่ยน endpoint ตาม backend จริง
				]);

				const rounds = roundsRes?.data?.data ?? [];
				const openRound = rounds.find((round: any) => round.status === 'OPEN') ?? null;
				const hasOpenRound = !!openRound;

				return {
					application: null,
					user: userRes.data.data,
					hasOpenRound,
					openRound
				};
			} catch (fallbackErr) {
				throw fallbackErr;
			}
		}

		throw err;
	}
};