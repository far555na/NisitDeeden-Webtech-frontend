<script lang="ts">
	export let type: 'button' | 'submit' = 'button';
	export let variant: 'primary' | 'outline' | 'filled' = 'primary';
	export let fullWidth = false;
	export let disabled = false;
	
	// 1. Accept onclick as a standard Svelte 5 prop instead of using createEventDispatcher
	export let onclick: ((e: MouseEvent) => void) | undefined = undefined;

	const baseClass =
		'flex h-min items-center justify-center gap-2 rounded-2xl px-5 py-3 font-medium transition';

	// 2. Make variants reactive so it updates properly if 'disabled' changes
	$: variants = {
		primary: disabled ? 'text-neutral-300' : 'text-primary',
		outline: disabled
			? 'border-2 border-neutral-300 text-neutral-300'
			: 'border-2 border-primary text-primary',
		filled: disabled ? 'bg-neutral-300 text-neutral-400' : 'bg-neutral-300 text-primary'
	};

	$: widthClass = fullWidth ? 'w-full' : '';
	$: disabledClass = disabled ? 'cursor-not-allowed opacity-70' : '';
	$: variantClass = variants[variant];

	function handleClick(e: MouseEvent) {
		if (disabled) return;
		// 3. Trigger the passed prop function directly
		if (onclick) onclick(e); 
	}
</script>

<button
	{type}
	{disabled}
	class={`${baseClass} ${variantClass} ${widthClass} ${disabledClass}`}
	on:click={handleClick}
>
	<slot name="left" />
	<slot />
	<slot name="right" />
</button>