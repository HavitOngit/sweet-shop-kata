import { createSweetShop } from "@core/";
import type { SweetModel } from "@core/src/models/sweet.model";
import { SvelteMap } from "svelte/reactivity";

export const sweetShop = $state(
  createSweetShop(new SvelteMap<string, SweetModel>()),
);
