<script>
  import BellSvg from './BellSvg.svelte'; 
  import LogoutSvg from './LogoutSvg.svelte';
//   import Notification from './Notification.svelte';
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
    <section class="h-screen overflow-auto">
        <div class="bg-yellow-300 flex flex-col h-[25vh] mb-8">
           <div class="bg-[#0094FF] h-[50%]">K</div>
           <div>
                <div class="flex">
                    <img class="h-[100px] w-[100px]">
                <span class="flex items-center">Founded by : USERNAME</span>
                </div>
           </div>
        </div>
        <div class="bg-blue-200 flex flex-col h-[30vh]">
            <span class="flex font-bold">About</span>
            <div class="bg-slate-400 flex justify-center">
                <textarea class="flex text-center disabled resize-none w-80 h-52 m-4 rounded-lg"></textarea>
            </div>
        </div>
        <div>Member section</div>


    </section>
</section>