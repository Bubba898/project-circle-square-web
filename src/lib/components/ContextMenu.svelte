<script lang="ts">
  import type {ContextMenuItem, ItemType} from "$lib/types/types";

    export let menuItems: ContextMenuItem[]
    export let showMenu: boolean = false
    export let x: number
    export let y: number
    export let on_item_click: (item: ContextMenuItem) => void

    function onClick(item: ContextMenuItem) {
      on_item_click(item)
    }

</script>
<svelte:head>
    <!-- You can change icon sets according to your taste. Change `class` value in `menuItems` above to represent your icons. -->
    <!-- <link rel="stylesheet" href="/icon/css/mfglabs_iconset.css"> -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>

{#if showMenu}
<nav style="position: absolute; top:{y}px; left:{x-170}px">
    <div class="navbar" id="navbar">
        <ul class="flex gap-2">
            {#each menuItems as item}
              <li>
                <button class="btn btn-outline p-2 p-1" on:click={() => onClick(item)} disabled={item.amount <= 0}>
                  <div class="flex p-2 flex-col place-content-center place-items-center">
                    <i class="{item.icon} text-{item.color}"/>
                    <span class="m-1 flex flex-row">
                      <div class="w-8 badge badge-{item.color} badge-outline p-2 mr-1 text-{item.color}">{item.amount}</div>
                      <span class="text-{item.color}">{item.text}</span>
                    </span>
                    <div class="flex flex-row">
                      <span class="w-8 h-2 text-xs">{Math.round(item.time_to_next*10)/10}s</span>
                      <progress class="progress w-20 h-4 progress-{item.color}" value={(item.cooldown - item.time_to_next) === 0 ? 0 : Math.abs((((item.time_to_next) / item.cooldown)*100) - 100)} max="100"></progress>
                    </div>
                  </div>
              </button>
              </li>
            {/each}
        </ul>
    </div>
</nav>
{/if}

<style>
    .navbar{
        display: inline-flex;
        background-color: #fff0;
        border-radius: 10px;
        overflow: hidden;
        flex-direction: column;
    }
    .navbar ul{
        margin: 1px;
    }
    ul li{
        display: block;
        list-style-type: none;
        width: 1fr;
    }
    ul li button{
        font-size: 1rem;
        width: 100%;
        height: 85px;
        text-align: left;
        background-color: #222;
        border: 0px;
    }
    ul li button:hover{
        color: #000;
        text-align: left;
        border-radius: 5px;
        background-color: #eee;
    }
    ul li button i{
        padding: 0px 15px 0px 10px;
    }
    ul li button i.fa-square{
        color: #fff;
    }
    ul li button:hover > i.fa-square{
        color: #eee;
    }
    ul li button:hover > i.warning{
        color: crimson;
    }
    :global(ul li button.info:hover){
        color: navy;
    }
    hr{
        border: none;
        border-bottom: 1px solid #ccc;
        margin: 5px 0px;
    }
</style>
