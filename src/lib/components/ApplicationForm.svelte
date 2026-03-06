<script lang="ts">
    import { goto } from '$app/navigation';
    import Button from '$lib/components/Button.svelte';
    import FormField from '$lib/components/FormField.svelte';
    import FormGrid from '$lib/components/FormGrid.svelte';
    import StepProgress from '$lib/components/StepProgress.svelte';
    import TextareaField from '$lib/components/TextareaField.svelte';
    import UploadCard from '$lib/components/UploadCard.svelte';
    import Icon from '@iconify/svelte';
    import { enhance } from '$app/forms';
    import type { SubmitFunction } from '@sveltejs/kit';

    let {
        category,
        form = null,
        initialValues = {},
        backUrl,
        action = "", 
        step = 2 
    }: {
        category: any;
        form?: any;
        initialValues?: Record<string, any>;
        backUrl: string;
        action?: string;
        step?: number;
    } = $props();

    let isSubmitting = $state(false);

    const handleSubmit: SubmitFunction = () => {
        isSubmitting = true;

        return async ({ update }) => {
            await update();
            isSubmitting = false;
        };
    };

    function prevPage() {
        goto(backUrl);
    }

    $effect(() => {
        if (form?.message) {
            alert(form.message);
        }

        if (form?.errors) {
            const errorText = Object.values(form.errors).flat().join('\n');
            alert(errorText);
        }
    });
</script>

<div class="flex justify-between pb-7">
    <Button on:click={prevPage}>
        <Icon slot="left" icon="mdi:arrow-left" class="text-primary" width="24" />
        ย้อนกลับ
    </Button>

    {#if step}
        <StepProgress {step} />
    {/if}

    <div class="invisible">
        <Button variant="outline">
            ถัดไป
            <Icon slot="right" icon="mdi:arrow-right" class="text-primary" width="24" />
        </Button>
    </div>
</div>

<form method="POST" {action} enctype="multipart/form-data" use:enhance={handleSubmit}>
    <input type="hidden" name="category_id" value={category.id} />
    <div class="mx-auto max-w-7xl">
        <p class="pb-7 text-3xl font-bold text-primary">ประเภท: {category.name}</p>

        <div class="flex flex-col gap-5">
            <div class="text-2xl font-semibold">รายละเอียด</div>
            {#each category.attributes as attribute}
                {#if attribute.type === 'text' || attribute.type === 'textarea'}
                    <FormGrid cols={1}>
                        {#if attribute.type === 'text'}
                            <FormField
                                id={`attr_${attribute.id}`}
                                name={`values[${attribute.id}]`}
                                label={attribute.label}
                                required={attribute.is_required}
                                disabled={isSubmitting}
                                value={initialValues[attribute.id] ?? ''} 
                            />
                        {:else}
                            <TextareaField
                                id={`attr_${attribute.id}`}
                                name={`values[${attribute.id}]`}
                                label={attribute.label}
                                required={attribute.is_required}
                                disabled={isSubmitting}
                                value={initialValues[attribute.id] ?? ''}
                            />
                        {/if}
                    </FormGrid>
                {/if}
            {/each}

            <div class="pt-5 text-2xl font-semibold">เอกสารประกอบ</div>
            {#each category.attributes as attribute}
                {#if attribute.type === 'file'}
                    <UploadCard
                        title={attribute.label}
                        name={`values[${attribute.id}]`}
                        required={attribute.is_required && !initialValues[attribute.id]} 
                        existingValue={initialValues[attribute.id]}
                        onUpload={(files) => console.log(files)}
                    />
                {/if}
            {/each}
        </div>

        <div class="flex justify-center pt-15">
            <Button variant="outline" type="submit" disabled={isSubmitting}>
                <Icon slot="left" icon="mdi:content-save" class="text-primary" width="24" />
                {#if isSubmitting}
                    กำลังบันทึกข้อมูล
                {:else}
                    บันทึก
                {/if}
            </Button>
        </div>
    </div>
</form>