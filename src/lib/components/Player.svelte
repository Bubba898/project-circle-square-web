<script lang="ts">

  import type {Position} from "$lib/types/types";

  export let pos: Position
  export let color: "red" | "blue" = "red"
  export let x_size: number
  export let y_size: number

  console.log(x_size, y_size, pos)
</script>

<span class="dot" style="background-color: {color}; bottom: {(pos.y/y_size)*97}%; left: {(pos.x/x_size)*97}%"></span>

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
