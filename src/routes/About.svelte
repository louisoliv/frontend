<script>
    export let users = []
    let isEditing = false;
    function toggleEditMode() {
    isEditing = !isEditing;
  }
</script>

<div class="ms-[40px] me-[480px] mb-[28px] mt-[38px] mx-auto p-6 bg-white shadow-md rounded-md hover:shadow-lg transition-shadow duration-300">
    {#each users as user}
    {#if isEditing && user.id == 1}
      <div>
        <label class="block mb-2">Name:</label>
        <input
          type="text"
          bind:value={user.name}
          class="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        />
  
        <label class="block mb-2">Email:</label>
        <input
          type="email"
          bind:value={user.email}
          class="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        />
  
        <label class="block mb-2">City:</label>
        <input
          type="text"
          bind:value={user.address.city}
          class="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        />
  
        <div class="flex justify-between">
          <button
            class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            on:click={saveChanges}
          >
            Save
          </button>
          <button
            class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            on:click={cancelEdit}
          >
            Cancel
          </button>
        </div>
      </div>
    {:else}
    {#if user.id == 1}
      <div on:dblclick={toggleEditMode}>
        <h2 class="text-xl font-bold">{user.name}</h2>
        <p class="text-gray-600">{user.email}</p>
        <p class="text-gray-600">City: {user.address.city}</p>
      </div>
      {/if}
    {/if}
    {/each}
  </div>