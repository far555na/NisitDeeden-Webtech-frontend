<script lang="ts">
	export let type: 'button' | 'submit' = 'button';
	export let variant: 'primary' | 'outline' | 'filled' = 'primary';
	export let fullWidth: boolean = false;
</script>

<button
	type={type}
	class="flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-medium text-primary h-min"

	class:border-2={variant === 'outline'}
	class:border-primary={variant === 'outline'}

	class:bg-neutral-300={variant === 'filled'}
	class:w-full={fullWidth}
>
	<slot name="left" />
	<slot />
	<slot name="right" />
</button>
