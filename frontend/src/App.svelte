<script lang="ts">
  import { createSweetShop } from "@core/";
  import type { Sweet, SweetModel } from "@core/src/models/sweet.model";
  import { SvelteMap } from "svelte/reactivity";

  const sweetShop = $state(
    createSweetShop(new SvelteMap<string, SweetModel>())
  );

  const sweets = $derived(sweetShop.getAllSweets());

  const sweet: Sweet = {
    id: "1",
    name: "Chocolate Bar",
    category: "Chocolate",
    price: 20,
    quantity: 10,
  };

  console.log("Sweet Shop Service Created:", sweetShop, typeof sweetShop);
</script>

{#if sweets.length === 0}
  <p>No sweets available.</p>
{:else}
  <h1>Sweets List</h1>
  {#each sweets as sweet}
    <div>
      <h2>{sweet.name}</h2>
      <p>Category: {sweet.category}</p>
      <p>Price: {sweet.price}</p>
      <p>Quantity: {sweet.quantity}</p>
    </div>
  {/each}
{/if}

<button onclick={() => sweetShop.addSweet(sweet)}>Add Sweet</button>
