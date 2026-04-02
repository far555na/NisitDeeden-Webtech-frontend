<script lang="ts">
	import Icon from '@iconify/svelte';

	interface Props {
		name: string;
		icon?: string | null;
		class?: string;
	}

	let { name, icon = null, class: className = '' }: Props = $props();
</script>

<span
	class={`inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-sm font-semibold text-primary ${className}`}
	title={name}
>
	{#if icon}
		<Icon icon={icon} class="h-4 w-4 shrink-0" />
	{/if}
	<span>{name}</span>
</span>