<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let { rounds } = data;
</script>

<div class="mx-auto max-w-7xl">
	<div class="grid grid-cols-1 justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
		{#each rounds as round}
			<div
				class="relative flex size-75 flex-col justify-between rounded-4xl border-3 border-primary p-8 hover:-translate-y-1 hover:shadow-md"
			>
				<div class="flex flex-col gap-4">
					<div
						class={`w-full rounded-full px-4 py-1 text-center text-sm font-semibold ${
							round.status === 'OPEN'
								? 'border border-green-200 bg-green-100 text-green-700'
								: 'border border-gray-200 bg-gray-100 text-gray-500'
						}`}
					>
						{round.status === 'OPEN' ? 'เปิด' : 'ปิด'}
					</div>

					<div>
						<h2 class="text-2xl font-bold text-primary">ปีการศึกษา {round.academic_year_th}</h2>
						<p class="text-lg text-primary/70">ภาคการศึกษา{round.semester_th}</p>
					</div>

					<div class="border-t border-neutral-200"></div>

					<div class="flex flex-col gap-1 text-sm text-slate-700">
						<div class="flex gap-2">
							<span class="font-semibold text-slate-900">เริ่ม:</span>
							<span>{round.start_time_th}</span>
						</div>

						<div class="flex gap-2">
							<span class="font-semibold text-slate-900">สิ้นสุด:</span>
							<span>{round.end_time_th}</span>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
