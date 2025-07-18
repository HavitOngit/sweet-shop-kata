<script lang="ts">
  import "./app.css";
  import type { Sweet } from "@core/src/models/sweet.model";
  import { sweetShop } from "./lib/store.svelte";
    import Restock from "$lib/add-sweet.svelte";
    import AddSweet from "$lib/add-sweet.svelte";
    import DataTable from "$lib/data-table.svelte";
  
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

<DataTable />

<AddSweet />
