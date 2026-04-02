import background from '$lib/assets/background.png';

export function getStorageUrl(path: string | null | undefined): string {
	const baseUrl = import.meta.env.VITE_STORAGE_URL || '';

	if (!path) return background;
	if (path.startsWith('/storage')) {
		const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
		return cleanBase + path;
	}

	return path;
}
