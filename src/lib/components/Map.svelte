<script lang="ts">
  import Player from "$lib/components/Player.svelte";
  import type {ContextMenuItem, ItemType, Position} from "$lib/types/types";
  import ContextMenu from "$lib/components/ContextMenu.svelte";

  export let player_1_position: Position
  let x_size: number = 50
  let y_size: number = 50
  let map_width: number = 0
  let map_height: number = 0

  export let zombies_positions: Position[]
  export let bombs_positions: Position[]
  export let enemies_positions: Position[]

  export let send_item_function: (x: number, y: number, selected: ItemType) => void

  let menu_items: ContextMenuItem[] = [
      {
          "item": "zombie",
          'text': "Zombie",
          'icon': 'fa-solid fa-biohazard',
          "amount": 1,
          "cooldown": 1,
          "time_to_next": 1,
          "color": "accent"
      },
      {
          "item": "bomb",
          'text': "Bomb",
          'icon': 'fa-solid fa-bomb',
          "amount": 1,
          "cooldown": 10,
          "time_to_next": 1,
          "color": "secondary"
      },
        {
          "item": "enemy",
          'text': "Enemy",
          'icon': 'fa-solid fa-skull',
          "amount": 1,
          "cooldown": 5,
          "time_to_next": 1,
          "color": "primary"
      },
    ]

  function count_down() {
    menu_items.forEach((item: ContextMenuItem) => {
      item.time_to_next = item.time_to_next - 0.01
      if(item.time_to_next <= 0) {
        item.amount = item.amount + 1
        item.time_to_next = item.cooldown
      }
    })
    menu_items = menu_items
    setTimeout(count_down, 10);
  }

  setTimeout(count_down, 10);

  let map_div: HTMLDivElement

  $: console.log(map_div?.getBoundingClientRect())

  let menu_x: number = 0
  let menu_y: number = 0

  let rel_click_x: number = 0
  let rel_click_y: number = 0


  let context_menu_open: boolean = false

  $: console.log(context_menu_open)

  function toggle_context_menu() {
    context_menu_open = !context_menu_open
  }

  function on_item_click(item: ContextMenuItem) {
    let x_pos_in_map = (rel_click_x / map_width) * x_size
    let y_pos_in_map = (rel_click_y / map_height) * y_size
    y_pos_in_map = Math.abs(y_pos_in_map - y_size)
    send_item_function(x_pos_in_map, y_pos_in_map, item.item)
    item.amount = item.amount - 1
    console.log(item)
    menu_items = menu_items
  }

  function onMapClick(event: MouseEvent) {
    console.log(event)
    console.log(map_div?.getBoundingClientRect())
    let click_x = event.x
    let click_y = event.y
    rel_click_x = event.offsetX
    rel_click_y = event.offsetY
    menu_x = click_x
    menu_y = click_y
    context_menu_open = true
  }
</script>


<div class="flex m-4 justify-center items-center" bind:this={map_div}>
  <div style="position:relative">
    <div class="max-w-full mx-auto text-white rounded-lg shadow-lg border-2 border-black" style="background-color: #0005">
      <Player color="yellow" pos={player_1_position} {x_size} {y_size} radius={24} icon="fa-solid fa-person-rifle"/>
      <img src="maps/map_1.png" alt="Map" class="rounded-lg" on:click={onMapClick} bind:clientWidth={map_width} bind:clientHeight={map_height}/>
      {#each zombies_positions as zombie}
        <Player color="accent" pos={zombie} {x_size} {y_size} radius={24} icon="fa-solid fa-biohazard"/>
      {/each}
      {#each bombs_positions as bomb}
        <Player color="secondary" pos={bomb} {x_size} {y_size} radius={24} icon="fa-solid fa-bomb"/>
      {/each}
      {#each enemies_positions as enemy}
        <Player color="primary" pos={enemy} {x_size} {y_size} radius={24} icon="fa-solid fa-skull"/>
      {/each}
    </div>
  </div>
</div>
<br>


<ContextMenu
  menuItems={menu_items}
  x = {menu_x}
  y = {menu_y}
  showMenu={context_menu_open}
  on_item_click={on_item_click}
/>

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
