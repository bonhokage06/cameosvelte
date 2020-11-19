<script>
  import { createEventDispatcher } from "svelte";
  import Card from "../components/Card.svelte";
  import { crossfade, fly, scale } from "svelte/transition";
  import { cubicOut, elasticOut } from "svelte/easing";
  import { sleep, pick_random } from "../utils";
  import { store } from "../Store";
  const dispatch = createEventDispatcher();
  let { selected } = $store.celebs;
  const promise = store.get_celeb_details(selected);
  let i = 0;
  let last_result;
  let done = false;
  let ready = true;
  const results = Array(selected.length);
  $: score = results.filter((result) => result === "right").length;
  const pick_message = (p) => {
    if (p < 0.5)
      return pick_random([
        "Ouch!",
        "That  wasn't very good!",
        "Must try harder!",
      ]);
    if (p <= 0.8) return pick_random(["Not bad", "Keep practicing!"]);
    if (p < 1) return pick_random(["So close!", "Almost there!"]);
    return pick_random(["You Rock!", "Flawless victory!"]);
  };
  const [send, receive] = crossfade({
    easing: cubicOut,
    duration: 300,
  });
  const submit = async (a, b, sign) => {
    last_result = Math.sign(a.price - b.price) === sign ? "right" : "wrong";
    //wait for 1500ms;
    await sleep(1500);
    results[i] = last_result;
    last_result = null;
    await sleep(500);
    if (i < selected.length - 1) {
      i += 1;
    } else {
      done = true;
    }
  };
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
    justify-content: center;
  }
  .game > div {
    display: flex;
    align-items: center;
  }
  .error {
    color: red;
  }
  .giant-result {
    position: fixed;
    width: 50vmin;
    height: 50vmin;
    left: calc(50vw - 25vmin);
    top: calc(50vh -25vmin);
    opacity: 0.5;
  }
  .results {
    display: grid;
    grid-gap: 0.2em;
    width: 100%;
    max-width: 320px;
    margin: 1em auto 0 auto;
  }
  .result {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    line-height: 0;
    padding: 0 0 100% 0;
  }
  .result > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .done {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
  .done strong {
    font-size: 6em;
    font-weight: 700;
  }
  .same {
    margin: auto;
  }
  @media (min-width: 500px) {
    .game {
      max-width: 100%;
      grid-template-rows: none;
      grid-template-columns: 1fr 8em 1fr;
      max-height: calc(100vh-8em);
    }
    .same {
      height: 8em;
      width: 100%;
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
  {#if done}
    <div
      class="done"
      in:scale={{ delay: 200, easing: elasticOut, duration: 800 }}>
      <strong>{score}/{results.length}</strong>
      <p>{pick_message(score / results.length)}</p><button
        on:click={() => dispatch('restart')}>Back to home screen</button>
    </div>
  {:else if ready}
    {#await promise[i] then [a, b]}
      <div
        class="game"
        in:fly={{ duration: 200, y: 20 }}
        out:fly={{ duration: 200, y: -20 }}
        on:outrostart={() => {
          ready = false;
        }}
        on:outroend={() => {
          ready = true;
        }}>
        <div class="card-container">
          <Card
            celeb={a}
            on:select={() => {
              submit(a, b, 1);
            }}
            showprice={!!last_result}
            winner={a.price > b.price} />
        </div>
        <div>
          <button
            class="same"
            on:click={() => {
              submit(a, b, 0);
            }}>
            same price
          </button>
        </div>
        <div class="card-container">
          <Card
            celeb={b}
            on:select={() => {
              submit(a, b, -1);
            }}
            showprice={!!last_result}
            winner={b.price > a.price} />
        </div>
      </div>
    {:catch error}
      <p class="error">{error.message}</p>
    {/await}
  {/if}
</div>
{#if last_result}
  <img
    class="giant-result"
    alt="{last_result} answer"
    src="/icons/{last_result}.svg"
    in:fly={{ x: 100, duration: 200 }}
    out:send={{ key: i }} />
{/if}
<div
  class="results"
  style="grid-template-columns: repeat({results.length}, 1fr)">
  {#each results as result, i}
    <span class="result">
      {#if result}
        <img
          alt="{result} answer"
          src="/icons/{result}.svg"
          in:receive={{ key: i }}
          out:send={{ key: i }} />
      {/if}
    </span>
  {/each}
</div>
