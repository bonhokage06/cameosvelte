<script>
  import { createEventDispatcher } from "svelte";
  import { scale } from "svelte/transition";
  import { elasticOut } from "svelte/easing";
  export let celeb;
  export let showprice;
  export let winner;
  const dispatch = createEventDispatcher();
</script>

<style>
  .card-outer {
    width: 100%;
    height: 70%;
  }
  .card-inner {
    color: white;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
  }
  .details {
    text-align: left;
    width: 100%;
    padding: 0.5em;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(0, 0, 0, 0.6) 35%,
      rgba(0, 0, 0, 0.9)
    );
  }
  .details > h2 {
    color: lightblue;
    margin-bottom: 0.2em;
  }
  .details > p {
    margin-top: 0.2em;
    text-overflow: ellipsis;
  }
  .price {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .price.large {
    font-size: 6em;
  }
</style>

<div class="card-outer">
  <button
    class="card-inner"
    style="background-image:url({celeb.image})"
    on:click|self={() => dispatch('select')}>
    <div class="details">
      <h2>
        <a target="_blank" href="https:/cameo.com/{celeb.id}">{celeb.name}</a>
      </h2>
      <p class="type">{celeb.type}</p>
    </div>
    {#if showprice}
      <div class="price" class:large={winner}>
        <span
          in:scale={{ easing: elasticOut, duration: 800 }}>${celeb.price}</span>
      </div>
    {/if}
  </button>
</div>
