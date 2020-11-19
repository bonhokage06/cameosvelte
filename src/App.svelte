<script>
  import { onMount } from "svelte";
  import { store } from "./Store";
  import { load_image } from "./utils";
  import Welcome from "./screens/Welcome.svelte";
  import Game from "./screens/Game.svelte";
  let state = "welcome"; // or playing;
  const start = async (e) => {
    const status = await store.load();
    if (status) {
      store.selection(e.detail.category.slug);
      state = "playing";
    }
  };
  const restart = () => {
    state = "welcome";
  };
  onMount(() => {
    load_image("/icons/right.svg");
    load_image("/icons/wrong.svg");
    load_image("/icons/compare.svg");
  });
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    max-width: 800px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>

<main>
  {#if state === 'welcome'}
    <Welcome on:select={start} />
  {:else if state === 'playing'}
    <Game on:restart={restart} />
  {/if}
</main>
