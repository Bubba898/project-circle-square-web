<script lang="ts">
  import Player from "$lib/components/Player.svelte";
  import type {Position} from "$lib/types/types";
  import ContextMenu from "$lib/components/ContextMenu.svelte";

  export let player_1_position: Position
  export let player_2_position: Position
  let x_size: number = 50
  let y_size: number = 50

  function item_click(name: string, pos: Position) {
    console.log(name, pos)
  }

  let menu_items = [
        {
            'name': 'Zombie',
            'onClick': item_click,
            'displayText': "Zombie",
            'class': 'fa-solid fa-plus'
        },
        {
            'name': 'Bomb',
            'onClick': item_click,
            'displayText': "Bomb",
            'class': 'fa-solid fa-square'
        },
    ]
</script>


  <div class="relative flex justify-center items-center">
    <div style="position:relative">
    <div class="max-w-full mx-auto p-2 bg-grey text-white rounded-lg shadow-lg border-2 border-black">
    <Player color="red" pos={player_1_position} x_size={x_size} y_size={y_size} />
    <Player color="blue" pos={player_2_position} {x_size} {y_size} />
    <img src="maps/map_1.png" alt="Map" class="rounded-lg" />
  </div>
  </div>
</div>
<br>

<ContextMenu menuItems={menu_items}/>
