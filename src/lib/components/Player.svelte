<script lang="ts">

  import type {Position} from "$lib/types/types";

  export let pos: Position
  export let color: string = "red"
  export let x_size: number
  export let y_size: number
  export let radius: number = 20
  export let icon: string = "fa-solid fa-biohazard"

  console.log(x_size, y_size, pos)
</script>
<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>

<span class="dot text-{color}" style="{color}; bottom: {(pos.y/y_size)*97}%; left: {(pos.x/x_size)*97}%; width: {radius}px; height: {radius}px; position: absolute">
  <i class="{icon}" style="position:absolute; left:2px; top: 2px;"></i>
</span>


<!---
Hacky span to have these classes in the build
-->
<span class="text-accent bg-accent text-secondary bg-secondary text-primary bg-primary progress-primary progress-secondary progress-accent" style="display:none"></span>

<style>
  .dot {
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    z-index: 500;
    border-color: #eeeeee;
    background-color: #000000;
    border-width: 2px;
  }
</style>
