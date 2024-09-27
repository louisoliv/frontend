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

<section id="commentSection" class="bg-white flex flex-col min-h-screen w-[35%]">
    <section>
        <div class="flex flex-row m-2.5">
            <input class="bg-customGray text-xxl text-black m-4  max-w-[px] p-1" placeholder="Search...">
            <div class="flex items-center align-middle">
                <ul class="flex flex-row items-center h-[7vh] justify-center">
                    <li class="mr-2 cursor-pointer">
                        <button on:click={toggleDropdown} class="bg-yellow-400 rounded-full p-1 w-[32px] m-1">O</button>
                        {#if isOpen}
                        <ul class="absolute z-10 right-0 mt-2 w-48 bg-[#6C6C6C] rounded shadow-lg">
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
        <section class="flex flex-col h-screen">
            <div class=" flex flex-col h-[15vh] mb-8 relative">
               <div class="bg-[#0094FF] h-[60%] flex relative"></div>
                    <div class="flex group absolute top-8 left-10">
                        <img class="h-[120px] w-[120px] rounded-lg bg-slate-400">
                        <span class="flex text-sm ml-2 h-[3vh] items-center font-bold relative top-16">Founded by : USERNAME</span>
                    </div>
               </div>
            <div class="flex flex-col h-[30vh]">
                <span class="flex font-bold ml-2">About</span>
                <div class="flex justify-center">
                    <textarea disabled class="flex text-center resize-none w-96 h-52 m-2 rounded-lg bg-customGray"></textarea>
                </div>
            </div>
            <div class="flex flex-col mt-4 mb-4 w-full ">
            <span class="font-bold ml-2">Membres</span>

                <div class="flex flex-col">
                    <div class="flex flex-row m-2">
                        <span class="h-[35px] w-[35px] bg-customPP rounded-sm mr-4 p-2"></span>
                        <p class="bg-customGray flex items-center w-full p-2">Membre 1</p>
                    </div>
                    <div class="flex flex-row m-2">
                        <span class="h-[35px] w-[35px] bg-customPP rounded-sm mr-4 p-2"></span>
                        <p class="bg-customGray flex items-center w-full p-2">Membre 2</p>
                    </div>
                    <div class="flex flex-row m-2">
                        <span class="h-[35px] w-[35px] bg-customPP rounded-sm mr-4 p-2"></span>
                        <p class="bg-customGray flex items-center w-full p-2">Membre 3</p>
                    </div>
                    <div class="flex flex-row m-2">
                        <span class="h-[35px] w-[35px] bg-customPP rounded-sm mr-4 p-2"></span>
                        <p class="bg-customGray flex items-center w-full p-2">Membre 4</p>
                    </div>
                    <div class="flex flex-row m-2">
                        <span class="h-[35px] w-[35px] bg-customPP rounded-sm mr-4 p-2"></span>
                        <p class="bg-customGray flex items-center w-full p-2">Membre 5</p>
                    </div>
                    <div class="flex flex-row m-2">
                        <span class="h-[35px] w-[35px] bg-customPP rounded-sm mr-4 p-2"></span>
                        <p class="bg-customGray flex items-center w-full p-2">Membre 6</p>
                    </div>
                    <div class="flex flex-row m-2">
                        <span class="h-[35px] w-[35px] bg-customPP rounded-sm mr-4 p-2"></span>
                        <p class="bg-customGray flex items-center w-full p-2">Membre 7</p>        
                    </div>
                </div>
            </div>
        </section>
    </section>
</section>