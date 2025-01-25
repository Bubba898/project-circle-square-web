<script lang="ts">
  import Player from "$lib/components/Player.svelte";
  import type {Position} from "$lib/types/types";

  export let player_1_position: Position
  export let player_2_position: Position
  let x_size: number = 50
  let y_size: number = 50
</script>

<div class="max-w-md mx-auto p-6 bg-grey text-white rounded-lg shadow-lg border-2 border-black">
  <div class="relative flex justify-center items-center">
    <Player color="red" pos={player_1_position} x_size={x_size} y_size={y_size} />
    <Player color="blue" pos={player_2_position} {x_size} {y_size} />
    <img src="maps/map_1.png" alt="Map" class="rounded-lg" />
  </div>
</div>
<br>
