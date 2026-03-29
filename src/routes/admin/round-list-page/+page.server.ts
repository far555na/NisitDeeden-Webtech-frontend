import type { PageServerLoad, Actions } from './$types';
import { authedGet } from '$lib/server/auth-helpers';

export const load: PageServerLoad = async (event) => {
    const res = await authedGet(event, `/rounds`);
    return { rounds: res.data.data };
};
