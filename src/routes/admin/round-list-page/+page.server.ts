import type { PageServerLoad, Actions } from './$types';
import { authedDelete, authedGet } from '$lib/server/auth-helpers';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
    const res = await authedGet(event, `/rounds`);
    return { rounds: res.data.data };
};

export const actions: Actions = {
    deleteRound: async (event) => {
        const formData = await event.request.formData();
        const id = formData.get('id');

        if (!id) {
            return fail(400, { message: 'Missing round id' });
        }

        await authedDelete(event, `/rounds/${id}`);

        throw redirect(303, '/admin/round-list-page');
    }
};