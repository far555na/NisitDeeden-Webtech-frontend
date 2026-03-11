import { authedGet } from "$lib/server/auth-helpers";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
    const res = await authedGet(event, `/applications/by-position`);
    return { applications: res.data.data };
};