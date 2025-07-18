<script lang="ts">
 import * as Table from "$lib/components/ui/table/index.js";
import { sweetShop } from "./store.svelte";

const sweets = $derived(sweetShop.getAllSweets());


</script>

<Table.Root>
 <Table.Caption>A list of your recent invoices.</Table.Caption>
 <Table.Header>
  <Table.Row>
   <Table.Head class="w-[100px]">Name</Table.Head>
   <Table.Head>Category</Table.Head>
   <Table.Head>Price</Table.Head>
   <Table.Head>Stock</Table.Head>
   <Table.Head>Status</Table.Head>
   <Table.Head class="text-right">Actions</Table.Head>
  </Table.Row>
 </Table.Header>
 <Table.Body>
  {#each sweets as sweet}
  <Table.Row>
    <Table.Cell class="font-medium">{sweet.name}</Table.Cell>
    <Table.Cell>{sweet.category}</Table.Cell>
    <Table.Cell>${sweet.price.toFixed(2)}</Table.Cell>
    <Table.Cell>{sweet.quantity}</Table.Cell>
    <Table.Cell>{sweet.quantity > 0 ? 'Available' : 'Out of Stock'}</Table.Cell>
    <Table.Cell class="text-right">
      <button class="btn btn-primary">Edit</button>
      <button class="btn btn-danger">Delete</button>
    </Table.Cell>
  </Table.Row>
  {/each}

 </Table.Body>
</Table.Root>