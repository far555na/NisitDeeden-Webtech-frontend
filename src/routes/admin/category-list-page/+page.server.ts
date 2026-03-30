    import type { Actions, PageServerLoad } from './$types';
    import { authedDelete, authedGet } from '$lib/server/auth-helpers';
    import { fail, redirect } from '@sveltejs/kit';

    export const load: PageServerLoad = async (event) => {
        const res = await authedGet(event, `/categories`);
        return { categories: res.data.data };
    };

    export const actions: Actions = {
        deleteCategory: async (event) => {
            const formData = await event.request.formData();
            const id = formData.get('id');

            if (!id) {
                return fail(400, { message: 'Missing category id' });
            }

            await authedDelete(event, `/categories/${id}`);

            throw redirect(303, '/admin/category-list-page');
        }
    };