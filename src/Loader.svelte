<script>
  import { onMount } from "svelte";
  export let Loader;
  let component;
  onMount(async () => {
    component = await Loader();
  });
</script>

<slot {component} />
