<script lang="ts">
     import { Button } from "$lib/components/ui/button/index.js";
    import { sweetShop } from "./store.svelte";
    const {id: string, quantity: number} = $props();

</script>

<Button onclick={() => sweetShop.restockSweet(id, quantity)}>Add Sweet</Button>