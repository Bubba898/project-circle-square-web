<script lang="ts">
	import type { ItemType } from "$lib/types/types";

    let x: number = 0.5;
    let y: number = 0.5;
    let selected:  ItemType = "bomb";
    export let send_item_function: (x: number, y: number, selected: ItemType) => void
    function onClick(event: any){
        send_item_function(x,y,selected)
    }
    function onChange(event: any) {
        selected = event.currentTarget.value;
        console.log(selected)
    }
</script>


x<input type="number" bind:value={x}/>
y<input type="number" bind:value={y}/>
<button class="btn" on:click={onClick}>Send</button>

<label>
	<input checked={selected==="shield"} on:change={onChange} type="radio" name="amount" value="shield" /> Shield
</label>
<label>
	<input checked={selected==="bomb"} on:change={onChange} type="radio" name="amount" value="bomb" /> Bomb
</label>
