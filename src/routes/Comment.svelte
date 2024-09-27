<script>
  import BellSvg from './BellSvg.svelte';
  import LogoutSvg from './LogoutSvg.svelte';
import Notification from './Notification.svelte';
  import ProfileSvg from './ProfileSvg.svelte';
// import { Dropdown, DropdownItem, DropdownDivider, DropdownHeader } from 'flowbite-svelte';

export let selectedPostComments = [];
export let showNotification = false;

let isOpen = false;

function toggleDropdown() {
    isOpen = !isOpen;
}


function bellIcon() {
    console.log("clickkkkk");
    selectedPostComments = []; 
    showNotification = true
}
    
</script>

<section id="commentSection" class="bg-white flex flex-col min-h-screen w-[35%] w-max-[40vw]">
    <div class="flex flex-row">
        <input class="text-xxl  text-blue-500 m-4  max-w-[px] p-1" placeholder="Search...">
        <div class="flex items-center align-middle">
            <ul class="flex flex-row items-center h-[7vh] justify-center">
                <li class="mr-2 cursor-pointer">
                    <button on:click={toggleDropdown} class="bg-yellow-400 rounded-full p-1 w-[32px] m-1">O</button>
                    {#if isOpen}
                    <ul class="absolute right-0 mt-2 w-48 bg-[#6C6C6C] rounded shadow-lg">
                        <li class="px-4 py-2 hover:bg-gray-200">
                            <div class="flex items-center">
                                <ProfileSvg/>
                                <a href="/profile" class="text-white">Profile</a>
                            </div>
                        </li>
                        <li class="px-4 py-2 hover:bg-gray-200">
                            <div class="flex items-center">
                                <LogoutSvg/>
                                <a href="/logout" class="text-white">Logout</a>
                            </div>
                        </li>
                    </ul>
                    {/if}
                </li>
                <button on:click={bellIcon} class="ml-2 z-10 cursor-pointer"> 
                    <BellSvg/>
                </button>
            </ul>
        </div>
    </div>
    <div class="h-screen overflow-auto">
        <!-- <button on:click={hideSectionComment}>X</button> -->
        <div class="flex flex-col">
            <!-- Render the comments for the selected post -->
            {#if selectedPostComments.length > 0}
                    <span class="font-bold ml-2">Commentaires</span>

                {#each selectedPostComments as comment}
                    <div class="flex flex-col bg-gray-300 h-auto p-1 m-3 text-xs text-center">
                        <div class="flex flex-col justify-around p-4 w-[90%]">  
                            <div><strong>Name:</strong> {comment.name}</div>
                            <div><strong>Email:</strong> {comment.email}</div>
                            <div><strong>Body:</strong> {comment.body}</div>
                        </div>
                    </div>
                {/each}
            {:else if showNotification === true}
                 <span class="font-bold ml-2">Notifications</span>
                <Notification/>

            {:else}
                <p class="flex justify-center text-center text-xl">No comments available, please select a post.</p>
            {/if}
        </div>
    </div>
</section>