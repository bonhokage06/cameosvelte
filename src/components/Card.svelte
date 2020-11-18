<script>
  export let celeb;
</script>

<style>
  .card-outer {
    width: 100%;
    height: 100%;
  }
  .card-inner {
    color: white;
    width: 100%;
    height: 100%;
    background: 50% 50% no-repeat;
    background-position: 50% 0;
    background-size: cover;
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
  }
  .details > p {
    text-overflow: ellipsis;
  }
</style>

<div class="card-outer">
  <button class="card-inner" style="background-image:url({celeb.image})">
    <div class="details">
      <h2>{celeb.name}</h2>
      <p>{celeb.type}</p>
    </div>
  </button>
</div>
