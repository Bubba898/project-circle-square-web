<script lang="ts">
  import type {ClientType, EventType, Message} from "$lib/types/types";

  export let connection_state = "not_connected"
  let ws: WebSocket | undefined = undefined
  let session_id: number = 1
  let client_type: ClientType = "web_client_ws"
  let message: string = ""

  function on_game_start(message: Message) {
    alert("GameStarted")
  }

  function on_message(message: Message) {
    if(message.event == "GameStarted") {
      on_game_start(message)
    }
  }

  function connect(event: SubmitEvent) {
    ws = new WebSocket("ws://localhost:8000/" + client_type + "/" + session_id);
    connection_state = "self_connected"
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


<h1>WebSocket Chat</h1>
<form on:submit|preventDefault={sendMessage}>
  <label>Session ID: <input type="number" value={session_id}/></label>
  <label>Client Type (unreal_ws | web_client_ws): <input type="text" value={client_type}/></label>
  <button on:click|preventDefault={connect} class="btn btn-primary">Connect</button>
  <hr>
  <label>Message: <input type="text" id="messageText" autocomplete="off"/></label>
  <button class="btn btn-primary">Send</button>
</form>
<ul id='messages'>
</ul>
