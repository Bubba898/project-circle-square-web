<script lang="ts">
  import type {ItemType, State, SpawnItemPayload, Position, PositionMessage, SpawnItemMessage, Message} from "$lib/types/types";
  import Map from "$lib/components/Map.svelte";
  import CheckBoxes from "$lib/components/CheckBoxes.svelte";

  let connection_state: State = "not_connected"
  let ws: WebSocket | undefined = undefined
  let session_id: number = 1
  let server_url: string = "project-circle-square-server.onrender.com"
  let simulate_unity: boolean = false
  let use_wss: boolean = false
  let message_text: string = ""
  $: messages = [""]

  let player_1_position: Position = {
    x: 50,
    y: 50
  }

  let player_2_position: Position = {
    x: 0.65,
    y: 0.5
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


<h1>Game State: {connection_state} {simulate_unity}</h1>
<hr/>
{#if connection_state === 'not_connected'}
<form>
  <p><label>Session ID: <input type="number" bind:value={session_id}/></label></p>
  <p><label>Server URL: <input type="text" bind:value={server_url}/></label></p>
  <label>Simulate Unity Client: <input type="checkbox" bind:checked={simulate_unity}/></label>
  <label>Use WSS: <input type="checkbox" bind:checked={use_wss}/></label>
  <button on:click|preventDefault={connect} class="btn btn-primary">Connect</button>
</form>
{:else if connection_state === 'waiting_for_other'}
  <p>
    Waiting for unity client to connect...
  </p>
  <hr/>
  <p>
    Your Session ID: {session_id}
  </p>
{:else if connection_state === 'game_started'}
  <p>
    Game is Started :)
    Your Session ID: {session_id}
  </p>
  <hr/>
  <label>Message: <input type="text" bind:value={message_text}/></label>
  <button class="btn btn-primary" on:click|preventDefault={sendMessage}>Send</button>
{/if}
<ul id='messages'>
</ul>
<Map player_1_position={player_1_position} player_2_position={player_2_position}/>

<CheckBoxes send_item_function={send_item}/>
