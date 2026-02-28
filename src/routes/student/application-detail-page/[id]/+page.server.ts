import type { PageServerLoad } from './$types';
import { authedGet } from '$lib/server/auth-helpers';

export const load: PageServerLoad = async (event) => {
    const id = event.params.id;
    const res = await authedGet(event, `/applications/${id}`);
    return { application: res.data.data };
};
