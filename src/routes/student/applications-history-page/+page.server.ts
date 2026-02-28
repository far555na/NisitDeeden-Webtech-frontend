import type { PageServerLoad } from './$types';
import { authedGet } from '$lib/server/auth-helpers';

export const load: PageServerLoad = async (event) => {
    const res = await authedGet(event, `/my-applications`);
    return { applications: res.data.data };
};
