<script lang="ts">
  export let cols: 1 | 2 | 3 = 2;
  export let gapX: string = "gap-x-10";
  export let gapY: string = "gap-y-5";
</script>

<form class={`grid w-full ${cols === 1 ? "grid-cols-1" : cols === 2 ? "grid-cols-2" : "grid-cols-3"} ${gapX} ${gapY}`}>
  <slot />
</form>
