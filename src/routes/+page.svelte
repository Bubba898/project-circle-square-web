<script lang="ts">
  import type {ItemType, State, SpawnItemPayload, Position, PositionMessage, SpawnItemMessage, Message} from "$lib/types/types";
  import Map from "$lib/components/Map.svelte";
  import CheckBoxes from "$lib/components/CheckBoxes.svelte";

  let connection_state: State = "not_connected"
  let ws: WebSocket | undefined = undefined
  let session_id: number = 1
  let server_url: string = "project-circle-square-server.onrender.com"
  let simulate_unity: boolean = false
  let use_wss: boolean = true
  let message_text: string = ""
  $: messages = [""]

  let player_1_position: Position = {
    x: 1,
    y: 1
  }

  let zombies_positions: Position[]
  let bombs_positions: Position[]
  let enemies_positions: Position[]


  let player_2_position: Position = {
    x: 1.5,
    y: 1.5
  }

  function send_item(x: number, y: number, item_type: ItemType){
    let payload: SpawnItemPayload = {
      position: {
        x:x, y: y
      },
      item_type: item_type
    }

    let message: SpawnItemMessage = {
      event: "ItemSpawn",
      payload: {SpawnItemPayload: payload}
    }

    console.log(JSON.stringify(message))

    ws?.send(JSON.stringify(message))
  }


  function on_game_start(message: Message) {
    connection_state = "game_started"
  }

  function on_position_update(message: PositionMessage) {
    if(message.payload.PositionUpdatePayload?.player) {
      player_1_position = message.payload.PositionUpdatePayload?.player
      zombies_positions = message.payload.PositionUpdatePayload?.zombies
      bombs_positions = message.payload.PositionUpdatePayload?.bombs
      enemies_positions = message.payload.PositionUpdatePayload?.enemies
    }
  }

  function on_message_json(message: Message) {
    messages.push(JSON.stringify(message))
    if(message.event == "GameStart") {
      on_game_start(message)
    } else if(message.event =="PositionUpdate") {
      on_position_update(message as PositionMessage)
    }
    messages = messages
  }


  function on_message(message: string) {
    messages.push(message)
    messages = messages
  }

  function connect(event: MouseEvent): void {
    let client_type = simulate_unity ? "unity_ws" : "web_client_ws"
    let protocol = use_wss ? "wss" : "ws"
    ws = new WebSocket(protocol + "://" + server_url + "/" + client_type + "/" + session_id);
    connection_state = "waiting_for_other"
    ws.onmessage = function (event) {
      console.log(event)
      try {
        const message: Message = JSON.parse(event.data)
        on_message_json(message)
      } catch {
        const message = event.data
        on_message(message)
      }
    };
  }

  function sendMessage(event: MouseEvent) {
    console.log(message_text)
    //messages.push(message_text)
    ws?.send(message_text)
    message_text = ""
  }
</script>




{#if connection_state === 'not_connected'}
<form class="gap-2 flex flex-col max-w-md mx-auto p-6 bg-grey text-white rounded-lg shadow-lg border-2 border-black mt-16" >
  <div class="flex justify-center mb-1">
    <img src="Logo.png" alt="Logo" class="max-sm object-contain" />
  </div>
  <div class="label">
      <span class="label-text">Session ID</span>
    </div>
  <input class="input input-secondary w-full" type="number" bind:value={session_id}/>
  <div class="label">
    <span class="label-text">Server URL</span>
  </div>
  <input class = "input input-secondary w-full" type="text" bind:value={server_url}/>
  <div class="flex">
    <input class="checkbox checkbox-secondary" type="checkbox" bind:checked={simulate_unity}/>
    <div class="label">
      <span class="label-text">Simulate Unity Client</span>
    </div>
  </div>

  <div class="flex">
    <input class="checkbox checkbox-secondary"type="checkbox" bind:checked={use_wss}/>
    <div class="label">
      <span class="label-text">Use WSS</span>
    </div>
  </div>
  <button on:click|preventDefault={connect} class="btn btn-secondary">Connect</button>
</form>
<br>
{:else if connection_state === 'waiting_for_other'}
  <div class="gap-5 flex flex-col max-w-md mx-auto p-6 bg-grey text-white rounded-lg shadow-lg border-2 border-black mt-16">
  <p class="h1">
    Waiting for unity client to connect...
  </p>
  <hr/>
  <p>
    Your Session ID: {session_id}
  </p>
  </div>
{:else if connection_state === 'game_started'}
  <Map player_1_position={player_1_position} send_item_function={send_item} zombies_positions={zombies_positions} bombs_positions={bombs_positions} enemies_positions={enemies_positions}/>
{/if}

<div class="btm-nav" style="background-color: #0000">
  <div/>
  <div class="flex justify-center mb-1">
    <img src="Logo.png" alt="Logo" class="max-sm object-contain w-32 m-4" />
  </div>
  <div>
    <div class="text-xs text-ghost absolute bottom-0 right-0 pb-2 pr-8">
      <span class="right-0 align-text-bottom">Created by: Team Circle Square</span>
  </div>
    </div>
</div>

<div class="fullscreen-bg w-full">
     <video loop muted autoplay class="fullscreen-bg_video">
          <source src="background.mp4" type="video/mp4">
     </video>
</div>

<style>
.fullscreen-bg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    z-index: -100;
    object-fit: fill;
}

.fullscreen-bg_video {
    object-fit: fill;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
