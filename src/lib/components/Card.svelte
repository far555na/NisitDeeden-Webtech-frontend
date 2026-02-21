<script lang="ts">
	export let href = '#';
</script>

<a
	{href}
	class="border-primary hover:-translate-y-1 hover:shadow-md  flex size-75 flex-col items-center justify-center rounded-4xl border-3"
>

		<slot name="icon" />


	<div class="text-primary text-center text-xl font-medium px-7 break-all pt-3">
		<slot />
	</div>
</a>
