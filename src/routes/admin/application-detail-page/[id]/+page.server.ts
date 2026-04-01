import type { Actions, PageServerLoad } from './$types';
import { authedDelete, authedGet } from '$lib/server/auth-helpers';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
    const id = event.params.id;
    const res = await authedGet(event, `/applications/${id}`);
    return { application: res.data.data };
};

export const actions: Actions = {
    deleteApplication: async (event) => {
        const formData = await event.request.formData();
        const id = formData.get('id');

        if (!id) {
            return fail(400, { message: 'Missing application id' });
        }

        await authedDelete(event, `/admin/applications/${id}`);

        throw redirect(303, '/admin/applications-list-page');
    }
};