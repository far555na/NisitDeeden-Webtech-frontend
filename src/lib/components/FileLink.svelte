<script lang="ts">
	import Icon from '@iconify/svelte';

	export let href: string = '#';
	export let label: string = 'ไฟล์แนบ';
	export let icon: string = 'mdi:file-outline';
	export let target: '_blank' | '_self' = '_blank';
	export let download: boolean = false;
</script>

<a
	href={href}
	target={target}
	rel={target === '_blank' ? 'noopener noreferrer' : undefined}
	class="inline-flex cursor-pointer items-center gap-2 text-primary hover:underline"
	download={download}
>
	<Icon icon={icon} class="text-primary" width="24" />
	<span class="text-primary">{label}</span>
</a>