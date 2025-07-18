<script lang="ts">
 import * as Table from "$lib/components/ui/table/index.js";
import { Input } from "$lib/components/ui/input/index.js";
import { sweetShop } from "./store.svelte";

const sweets = $derived(sweetShop.getAllSweets());
let searchQuery = $state("");

const filteredSweets = $derived(
  sweets.filter(sweet => {
    const query = searchQuery.toLowerCase();
    return (
      sweet.name.toLowerCase().includes(query) ||
      sweet.category.toLowerCase().includes(query) ||
      sweet.quantity.toString().includes(query)
    );
  })
);
</script>

<div class="w-full">
  <div class="flex items-center py-4">
    <Input
      placeholder="Search by name, category, or stock..."
      bind:value={searchQuery}
      class="max-w-sm"
    />
  </div>
  
  <Table.Root>
    <Table.Caption>Sweet Shop Dashboard</Table.Caption>
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
      {#each filteredSweets as sweet}
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
</div>