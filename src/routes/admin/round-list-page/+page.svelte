<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Icon from '@iconify/svelte';
	import type { PageProps } from './$types';
	import { goto } from '$app/navigation';

	let { data }: PageProps = $props();
	let { rounds } = data;

	function gotoCreate() {
		goto(`/admin/round-form-page`);
	}

	function gotoEdit(id: number) {
		goto(`/admin/round-form-page/${id}`);
	}

	function getStatusClass(status: string) {
		switch (status) {
			case 'OPEN':
				return 'border border-green-200 bg-green-50 text-green-700';
			case 'CLOSED':
				return 'border border-red-200 bg-red-50 text-red-700';
			case 'DRAFT':
				return 'border border-neutral-200 bg-neutral-100 text-neutral-600';
			default:
				return 'border border-neutral-200 bg-neutral-100 text-neutral-500';
		}
	}

	function getStatusLabel(status: string) {
		switch (status) {
			case 'OPEN':
				return 'เปิด';
			case 'CLOSED':
				return 'ปิด';
			case 'DRAFT':
				return 'ร่าง';
			default:
				return status;
		}
	}
</script>

<div class="mx-auto max-w-7xl">
	<div class="mb-6 flex items-start justify-between gap-4">
		<div>
			<h1 class="text-3xl font-bold text-neutral-900">รายการรอบสมัครทั้งหมด</h1>
			<p class="mt-1 text-sm text-neutral-500">
				จัดการระยะเวลาสำหรับการส่งใบสมัครของนิสิต
			</p>
		</div>

		<Button
			variant="filled"
			class="px-10 transition hover:shadow-md"
			onclick={gotoCreate}
			buttonClass="bg-primary text-white"
		>
			<Icon slot="left" icon="mdi:plus" class="text-white" width="24" />
			เพิ่มรอบสมัคร
		</Button>
	</div>

	<div
		class="grid grid-cols-1 justify-center justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
	>
		{#each rounds as round}
			<div
				class="group relative flex size-75 flex-col justify-between rounded-4xl border border-primary/70 bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
			>
				<div class="flex flex-col gap-4">
					<div
						class={`w-full rounded-full px-4 py-1 text-center text-sm font-semibold ${getStatusClass(round.status)}`}
					>
						{getStatusLabel(round.status)}
					</div>

					<div>
						<h2 class="text-2xl font-bold text-primary">
							ปีการศึกษา {round.academic_year_th}
						</h2>
						<p class="text-lg text-primary/90">
							ภาคการศึกษา{round.semester_th}
						</p>
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

				<div class="absolute right-4 bottom-4 flex items-center gap-2">
					<Button
						variant="primary"
						buttonClass="!p-3 transition hover:scale-105"
						onclick={() => gotoEdit(round.id)}
					>
						แก้ไข
					</Button>

					{#if round.applications_count === 0}
						<form method="POST" action="?/deleteRound">
							<input type="hidden" name="id" value={round.id} />
							<Button
								variant="primary"
								buttonClass="!p-3 text-red-500 transition hover:text-red-600"
								type="submit"
							>
								ลบ
							</Button>
						</form>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>