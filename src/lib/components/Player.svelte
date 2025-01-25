<script lang="ts">

  import type {Position} from "$lib/types/types";

  export let pos: Position
  export let color: "red" | "blue" = "red"
</script>

<span class="dot" style="background-color: {color}; bottom: {pos.y*100}%; left: {pos.x*100}%"></span>

<style>
  .dot {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    z-index: 500;
  }
</style>
