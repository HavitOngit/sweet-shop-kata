import { mount } from "svelte";
import "./app.css";
import App from "./App.svelte";
import { createSweetShop } from "@core/index";

const sweetShop = createSweetShop();
console.log("Sweet Shop Service Created:", sweetShop);

const app = mount(App, {
  target: document.getElementById("app")!,
});

export default app;
