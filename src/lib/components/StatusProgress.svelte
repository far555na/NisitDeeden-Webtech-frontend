<script lang="ts">
	import {
		ApplicationStatus,
		type ApplicationStatusValue
	} from '$lib/types/application-status';

	interface Props {
		status?: ApplicationStatusValue;
		labels?: string[];
	}

	let {
		status = ApplicationStatus.PENDING,
		labels = [
			'อยู่ระหว่างการเสนอ',
			'หัวหน้าภาควิชา',
			'รองคณบดี',
			'คณบดี',
			'คณะกรรมการ'
		]
	}: Props = $props();

	function getStepFromStatus(status: ApplicationStatusValue): number {
		switch (status) {
			case ApplicationStatus.PENDING:
				return 1;
			case ApplicationStatus.APPROVED_BY_DEPARTMENT:
				return 2;
			case ApplicationStatus.APPROVED_BY_ASSOCIATE_DEAN:
				return 3;
			case ApplicationStatus.APPROVED_BY_DEAN:
				return 4;
			case ApplicationStatus.APPROVED_BY_COMMITTEE:
				return 5;
			case ApplicationStatus.REJECTED:
				return 1;
			default:
				return 1;
		}
	}

	const currentStep = $derived(getStepFromStatus(status));
</script>

<div class="w-full">
	<div class="border-primary flex h-10 w-full overflow-hidden rounded-full border-2">
		{#each labels as _, i}
			<div
				class={`border-primary flex-1 ${
					i !== labels.length - 1 ? 'border-r-2' : ''
				} ${i < currentStep ? 'bg-primary' : 'bg-white'}`}
			></div>
		{/each}
	</div>

	<div
		class="mt-4 grid text-center text-sm font-semibold"
		style={`grid-template-columns: repeat(${labels.length}, minmax(0, 1fr));`}
	>
		{#each labels as label, i}
			<div class={`px-1 break-words ${i < currentStep ? 'text-primary' : 'text-black'}`}>
				{label}
			</div>
		{/each}
	</div>
</div>