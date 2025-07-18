<script lang="ts">
  import "./app.css";
  import type { Sweet } from "@core/src/models/sweet.model";
  import { sweetShop } from "./lib/store.svelte";
    import Restock from "$lib/add-sweet.svelte";
    import AddSweet from "$lib/add-sweet.svelte";
  
  const sweets = $derived(sweetShop.getAllSweets());
  
  const sweet: Sweet = {
    id: "1",
    name: "Chocolate Bar",
    category: "Chocolate",
    price: 20,
    quantity: 10
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

<AddSweet />
