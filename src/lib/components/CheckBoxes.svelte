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

<div class="max-w-md mx-auto p-6 bg-grey text-white rounded-lg shadow-lg border-2 border-black">
    <h3 class="text-lg font-semibold mb-4">Enter Coordinates</h3>
    <div class="mb-4">
      <label class="block text-sm font-medium">X</label>
      <input
        type="number"
        class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div class="mb-4">
      <label class="block text-sm font-medium">Y</label>
      <input
        type="number"
        class="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <button
      class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
    >
      Send
    </button>
    <div class="mt-6">
      <h4 class="text-sm font-medium mb-2">Select an Option</h4>
      <div class="flex items-center mb-2">
        <input
          type="radio"
          name="amount"
          value="shield"
          class="mr-2"
        />
        <label class="text-sm">Shield</label>
      </div>
      <div class="flex items-center">
        <input
          type="radio"
          name="amount"
          value="bomb"
          class="mr-2"
        />
        <label class="text-sm">Bomb</label>
      </div>

      <div class="mt-6">
      <h4 class="text-sm font-medium mb-2">Select an Option</h4>
      <div class="flex items-center mb-2">
        <input
          type="radio"
          name="amount"
          value="shield"
          class="mr-2"
        />

        <div class="mt-6">
            <h4 class="text-sm font-medium mb-2">Select an Option</h4>
            <div class="flex items-center mb-2">
              <input
                type="radio"
                name="amount"
                value="zombie"
                class="mr-2"
        />

        <div class="mt-6">
            <h4 class="text-sm font-medium mb-2">Select an Option</h4>
            <div class="flex items-center mb-2">
              <input
                type="radio"
                name="amount"
                value="zombie"
                class="mr-2"
        />
        
        <div class="mt-6">
            <h4 class="text-sm font-medium mb-2">Select an Option</h4>
            <div class="flex items-center mb-2">
              <input
                type="radio"
                name="amount"
                value="enemy"
                class="mr-2"
        />
    </div>
  </div>
  