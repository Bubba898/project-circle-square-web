<script lang="ts">
  import type {ClientType} from "$lib/types/types";

  let ws: WebSocket | undefined = undefined
  let session_id: number = 1
  let client_type: ClientType = "web_client_ws"
  let message: string = ""

  function connect(event: SubmitEvent) {
    ws = new WebSocket("ws://localhost:8000/" + client_type + "/" + session_id);
    ws.onmessage = function (event) {
      let messages = document.getElementById('messages')
      let message = document.createElement('li')
      let content = document.createTextNode(event.data)
      message.appendChild(content)
      messages?.appendChild(message)
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
