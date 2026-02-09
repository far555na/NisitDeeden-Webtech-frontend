<script lang="ts">
	export let type: 'button' | 'submit' = 'button';
	export let variant: 'primary' | 'outline' = 'primary';
</script>

<button
	type={type}
	class="flex items-center justify-center gap-2 rounded-2xl px-5 py-2 font-medium text-primary"
	class:border-2={variant === 'outline'}
	class:border-primary={variant === 'outline'}
>
	<slot name="left" />
	<slot />
	<slot name="right" />
</button>
