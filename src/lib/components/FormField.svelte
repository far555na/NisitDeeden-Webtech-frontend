<script lang="ts">
  export let id: string;
  export let name: string;
  export let label: string;

  export let type: string = "text";
  export let value: string = "";          // ถ้าจะ bind
  export let placeholder: string = "";
  export let required: boolean = false;
  export let disabled: boolean = false;
  export let readonly: boolean = false;

  // ถ้าอยากกำหนดกว้างเอง เช่น "w-sm" หรือ "w-full"
  export let wrapperClass: string = "w-full";
  export let inputClass: string = "";
</script>

<div class={`flex flex-col ${wrapperClass}`}>
  <label for={id} class="mb-1">{label}</label>

  <input
    id={id}
    name={name}
    type={type}
    bind:value
    {placeholder}
    {required}
    {disabled}
    {readonly}
    class={`border-0 border-b-2   p-0 m-0 ${readonly ? "border-tertiary focus:outline-none focus:ring-0 cursor-default w-auto" : "border-tertiary focus:border-primary focus:outline-none focus:ring-0 w-auto"} ${inputClass}`}
  />
</div>
