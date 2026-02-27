<script lang="ts">
	export let name: string;
	export let email: string;
	export let profilePath: string | null = null;
	export let fallbackImage: string;
	export let size: 'sm' | 'md' | 'lg' = 'md';

	const sizeClass = {
		sm: 'h-8 w-8',
		md: 'h-10 w-10',
		lg: 'h-14 w-14'
	};
</script>

<div class="flex items-center gap-3">
	<img
		class={`rounded-full object-cover ${sizeClass[size]}`}
		src={profilePath
			? fallbackImage
			: // ? `http://localhost:8000/storage/${profilePath}`
				fallbackImage}
		alt={name}
	/>

	<div class="flex flex-col">
		<span>{name}</span>
		<span class="text-xs text-neutral-500">{email}</span>
	</div>
</div>
