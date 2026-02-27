<script lang="ts">
  export let id: string;
  export let name: string;
  export let label: string;

  export let value: string = "";
  export let placeholder: string = "";
  export let required: boolean = false;
  export let disabled: boolean = false;
  export let readonly: boolean = false;

  export let rows: number = 3;

  export let wrapperClass: string = "w-full";
  export let textareaClass: string = "";
</script>

<div class={`flex flex-col ${wrapperClass}`}>
  <label for={id} class="mb-2">{label}</label>

  <textarea
    id={id}
    name={name}
    bind:value
    rows={rows}
    {placeholder}
    {required}
    {disabled}
    {readonly}
    class={`border-2 rounded-2xl resize-none bg-transparent
      ${
        readonly
          ? "border-tertiary focus:outline-none focus:ring-0 cursor-default w-auto"
          : "border-tertiary focus:border-primary focus:outline-none focus:ring-0 w-auto"
      }
      ${textareaClass}`}
  ></textarea>
</div>