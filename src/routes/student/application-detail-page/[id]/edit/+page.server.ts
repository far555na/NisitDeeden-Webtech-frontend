import type { Actions, PageServerLoad } from './$types';
import { authedGet, authedPost } from '$lib/server/auth-helpers';
import { fail, error, redirect } from '@sveltejs/kit';
import apiClient from '$lib/server/api-client.server';




export const load: PageServerLoad = async (event) => {
  const id = event.params.id;

  const appRes = await authedGet(event, `/applications/${id}`);
  const application = appRes.data.data;

  const catRes = await authedGet(event, `/categories/${application.category.id}`);
  const category = catRes.data.data;

  return { application, category };
};

export const actions: Actions = {
    default: async (event) => {
        const formData = await event.request.formData();
        const id = event.params.id;
        
        formData.append('_method', 'PUT');

        try {
            await authedPost(event, `/applications/${id}`, formData);
            throw redirect(303, '/student/applications-history-page');

        } catch (error: any) {
            if (error.status === 303) throw error;

            if (error.response?.status === 422) {
                const data = Object.fromEntries(formData);

                for (const key in data) {
                    if (data[key] instanceof File) {
                        delete data[key];
                    }
                }

                return fail(422, {
                    errors: error.response.data.errors,
                    data: data
                });
            }
            console.log(error);
            return fail(500, { message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
        }
    }
};