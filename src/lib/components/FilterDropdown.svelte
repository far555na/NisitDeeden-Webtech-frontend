<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Icon from '@iconify/svelte';

	type FilterOption = {
		label: string;
		value: string;
	};

	interface Props {
		options: FilterOption[];
		value: string;
		variant?: 'primary' | 'outline' | 'filled' | 'outlineRed';
		widthClass?: string;
		onSelect?: (value: string) => void;
	}

	let {
		options,
		value,
		variant = 'outline',
		widthClass = 'min-w-[220px]',
		onSelect
	}: Props = $props();

	let open = $state(false);

	const selectedLabel = $derived(
		options.find((option) => option.value === value)?.label ?? 'ทั้งหมด'
	);

	function selectFilter(selectedValue: string) {
		onSelect?.(selectedValue);
		open = false;
	}
</script>

<div class="relative inline-block">
	<Button variant={variant} onclick={() => (open = !open)}>
		{selectedLabel}
		<Icon
			slot="right"
			icon={open ? 'mdi:chevron-up' : 'mdi:chevron-down'}
			class="text-primary"
			width="24"
		/>
	</Button>

	{#if open}
		<div
			class={`absolute right-0 z-10 mt-2 ${widthClass} rounded-xl border border-neutral-200 bg-white p-2 shadow-lg`}
		>
			{#each options as option}
				<button
					type="button"
					class="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left hover:bg-neutral-100"
					onclick={() => selectFilter(option.value)}
				>
					<span>{option.label}</span>
					{#if value === option.value}
						<Icon icon="mdi:check" class="text-primary" width="20" />
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>