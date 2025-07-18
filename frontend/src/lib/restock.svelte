<script lang="ts">
     import { Button } from "$lib/components/ui/button/index.js";
     import { sweetShop } from "./store.svelte";

    let {id, quantity}: {id: string, quantity: number} = $props();

    function restockSweet() {


        sweetShop.restockSweet(id, quantity);
    }
</script>

<Button onclick={restockSweet}>Add Sweet</Button>