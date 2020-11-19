<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  let selected = false;
  let select = (category) => {
    selected = true;
    dispatch("select", { category });
  };
  let categories = [
    { slug: "actors", label: "Actors" },
    { slug: "athletes", label: "Altheltes" },
    { slug: "comedians", label: "Comedians" },
    { slug: "models", label: "Models" },
    { slug: "musician", label: "Musician" },
    { slug: "creators", label: "Creators" },
    { slug: "realty-tv", label: "Reality TV" },
  ];
</script>

<style>
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: min(12vw, 4em);
    font-weight: 100;
    margin: 0 0 0.5em 0;
  }
  p {
    max-width: 24em;
    margin: 0 auto 1em auto;
  }
  .logo {
    display: inline-block;
    background: url(/icons/compare.svg) 50% 50% no-repeat;
    background-size: 100% 100%;
    width: 0.8em;
    top: 0.05em;
    transform: scale(1.4);
    left: 0.02em;
    text-indent: -9999px;
  }
  .categories {
    width: 100%;
    max-width: 26em;
  }
  .categories > button {
    margin: 0.3em;
    padding: 1em;
    display: block;
    width: 100%;
  }
  @media (min-width: 640px) {
    .categories > button {
      margin: 0.2em;
      padding: 1em;
      display: inline;
      width: auto;
    }
  }
</style>

<header>
  <h1>CameoP<span class="logo">a</span>rison</h1>
  <p>
    On
    <a href="/">cameo.com</a>
    , you can personalized video clips from everyone
  </p>
  <p>But who command the highest price?</p>
</header>
<p>Pick a category to place a game:</p>

<div class="categories">
  {#each categories as category}
    <button
      disabled={selected}
      on:click={() => {
        select(category);
      }}>{category.label}</button>
  {/each}
</div>
