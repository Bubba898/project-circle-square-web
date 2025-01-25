<script lang="ts">
  import Player from "$lib/components/Player.svelte";
  import type {Position} from "$lib/types/types";

  export let player_1_position: Position = {
    x: 0.5,
    y: 0.5
  }
  export let player_2_position: Position = {
    x: 0.5,
    y: 0.5
  }
</script>

<div class="flex" style="position: relative; width: fit-content">
  <Player color="red" pos={player_1_position}/>
  <Player color="blue" pos={player_2_position}/>
  <img src="maps/map_1.png" alt="Map"/>
</div>

