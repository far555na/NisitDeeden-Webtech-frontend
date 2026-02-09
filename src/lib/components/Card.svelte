<script lang="ts">
	export let href = '#';
</script>

<a
	{href}
	class="border-primary hover:bg-primary/5 flex size-75 flex-col items-center justify-center rounded-4xl border-3"
>

		<slot name="icon" />


	<div class="text-primary text-center text-xl font-medium px-7 break-all">
		<slot />
	</div>
</a>
