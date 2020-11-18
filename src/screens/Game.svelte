<script>
  import Card from "../components/Card.svelte";
  import { store } from "../Store";
  let { selected } = $store.celebs;
  const promise = store.get_celeb_details(selected);
  let i = 0;
</script>

<style>
  .game-container {
    flex: 1;
  }
  .game {
    display: grid;
    grid-template-rows: 1fr 2em 1fr;
    grid-gap: 0.5em;
    width: 100%;
    height: 100%;
    max-width: min(100%, 40vh);
    margin: 0 auto;
  }
  .game > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .error {
    color: red;
  }
  @media (min-width: 500px) {
    .game {
      max-width: 100%;
      grid-template-rows: none;
      grid-template-columns: 1fr 8em 1fr;
      max-height: calc(100vh-6em);
    }
  }
</style>

<header>
  <p>
    Tap on the more monetisable celebrity's face, or tap 'same price' if society
    values them equally.
  </p>
</header>
<div class="game-container">
  {#await promise[i] then [a, b]}
    <div class="game">
      <div class="card-container">
        <Card celeb={a} />
      </div>
      <div class="same"><button class="same"> same price </button></div>
      <div class="card-container">
        <Card celeb={b} />
      </div>
    </div>
  {:catch error}
    <p class="error">{error.message}</p>
  {/await}
</div>
<div class="results">
  <p>results will go here</p>
</div>
