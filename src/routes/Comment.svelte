<script>
import Notification from './Notification.svelte';
import { Dropdown, DropdownItem, DropdownDivider, DropdownHeader } from 'flowbite-svelte';

export let selectedPostComments = [];
export let showNotification = false;

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
                <li class="mr-2">
                    <span class="bg-yellow-400 rounded-full p-1 w-[32px] m-1">O</span>
                </li>
                <button on:click={bellIcon} class="ml-2 z-10 cursor-pointer"> 
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                        <path d="M4 19V17H6V10C6 8.61667 6.41667 7.39167 7.25 6.325C8.08333 5.24167 9.16667 4.53333 10.5 4.2V3.5C10.5 3.08333 10.6417 2.73333 10.925 2.45C11.225 2.15 11.5833 2 12 2C12.4167 2 12.7667 2.15 13.05 2.45C13.35 2.73333 13.5 3.08333 13.5 3.5V4.2C14.8333 4.53333 15.9167 5.24167 16.75 6.325C17.5833 7.39167 18 8.61667 18 10V17H20V19H4ZM12 22C11.45 22 10.975 21.8083 10.575 21.425C10.1917 21.025 10 20.55 10 20H14C14 20.55 13.8 21.025 13.4 21.425C13.0167 21.8083 12.55 22 12 22ZM8 17H16V10C16 8.9 15.6083 7.95833 14.825 7.175C14.0417 6.39167 13.1 6 12 6C10.9 6 9.95833 6.39167 9.175 7.175C8.39167 7.95833 8 8.9 8 10V17Z" fill="#1D1B20"/>
                    </svg>
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