<script lang="ts">
     import { Button } from "$lib/components/ui/button/index.js";
    import { sweetShop } from "./store.svelte";

     

   function addSweet() {
    const sweet = {
       id: crypto.randomUUID(),
       name: "Chocolate Bar",
       category: "Chocolate",
       price: 20,
       quantity: 10
     };
     
     sweetShop.addSweet(sweet);
   }
</script>

<Button onclick={addSweet}>Add Sweet</Button>