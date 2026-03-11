import type { Actions, PageServerLoad } from './$types';
import { authedGet, authedPatch } from '$lib/server/auth-helpers';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const id = event.params.id;
	const res = await authedGet(event, `/applications/${id}`);
	return { application: res.data.data };
};

export const actions: Actions = {
	approve: async (event) => {
		const id = event.params.id;

		try {
			await authedPatch(event, `/applications/${id}/status`, {
				action: 'approve'
			});

			throw redirect(303, '/committee/applications-list-page');
		} catch (err: any) {
			if (err?.status === 303) throw err;

			return fail(err?.response?.status || 500, {
				success: false,
				message: err?.response?.data?.message || 'Failed to approve application'
			});
		}
	},

	reject: async (event) => {
		const formData = await event.request.formData();
		const reject_reason = formData.get('reject_reason');

		const id = event.params.id;

		try {
			await authedPatch(event, `/applications/${id}/status`, {
				action: 'reject',
				rejection_reason: reject_reason
			});

			throw redirect(303, '/committee/applications-list-page');
		} catch (err: any) {
			if (err?.status === 303) throw err;
			
			return fail(err?.response?.status || 500, {
				success: false,
				message: err?.response?.data?.message || 'Failed to reject application'
			});
		}
	}
};
