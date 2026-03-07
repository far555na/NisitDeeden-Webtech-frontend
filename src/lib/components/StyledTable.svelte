<script lang="ts">
	export let headers: string[] = [];
</script>

<table class="w-full border rounded-2xl overflow-hidden">
	<thead class="bg-neutral-100  text-left">
		<tr>
			{#each headers as h}
				<th class="px-6 py-4">{h}</th>
			{/each}
			<!-- <th class="px-6 py-4"></th> -->
		</tr>
	</thead>

	<tbody>
		<slot />
	</tbody>
</table>

<style>
	:global(tbody td) {
		padding: 0.5rem 1.5rem; /* same as px-6 py-4 */
	}

    :global(tbody tr) {
		background-color: oklch(98.5% 0 0); /* same as hover:bg-neutral-50 */
	}

	:global(tbody tr:not(.no-hover):hover) {
		background-color: oklch(97% 0 0); /* same as hover:bg-neutral-100 */
		transition: 0.2s;
	}
</style>