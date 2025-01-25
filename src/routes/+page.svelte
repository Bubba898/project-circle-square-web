<script lang="ts">
  import type {ClientType, Message, State} from "$lib/types/types";

  let connection_state: State = "not_connected"
  let ws: WebSocket | undefined = undefined
  let session_id: number = 1
  let server_url: string = "project-circle-square-server.vercel.app"
  let simulate_unity: boolean = false
  let message: string = ""

  function on_game_start(message: Message) {
    connection_state = "game_started"
  }

  function on_message(message: Message) {
    alert(`GameStarted: ${message}`)
    if(message.event == "GameStart") {
      on_game_start(message)
    }
  }

  function connect(event: MouseEvent): void {
    let client_type = simulate_unity ? "unity_ws" : "web_client_ws"
    ws = new WebSocket("ws://" + server_url + "/" + client_type + "/" + session_id);
    connection_state = "waiting_for_other"
    ws.onmessage = function (event) {
      // exisiting example code
      let messages = document.getElementById('messages')
      let message2 = document.createElement('li')
      let content = document.createTextNode(event.data)
      message2.appendChild(content)
      messages?.appendChild(message2)

      // real implementation
      const message: Message = JSON.parse(event.data)
      on_message(message)
    };
  }

  function sendMessage(event: SubmitEvent) {
    ws?.send(message)
    message = ''
  }
</script>


<h1>Game State: {connection_state} {simulate_unity}</h1>
<hr/>
{#if connection_state === 'not_connected'}
<form on:submit|preventDefault={sendMessage}>
  <p><label>Session ID: <input type="number" bind:value={session_id}/></label></p>
  <p><label>Server URL: <input type="text" bind:value={server_url}/></label></p>
  <label>Simulate Unity Client: <input type="checkbox" bind:checked={simulate_unity}/></label>
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
  <label>Message: <input type="text" id="messageText" autocomplete="off"/></label>
  <button class="btn btn-primary">Send</button>
{/if}
<ul id='messages'>
</ul>
