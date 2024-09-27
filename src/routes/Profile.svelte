<script>
    // existing imports
    import BellSvg from './BellSvg.svelte'; 
    import LogoutSvg from './LogoutSvg.svelte';
    import Notification from './Notification.svelte';
    import About from './About.svelte';
    import ProfileSvg from './ProfileSvg.svelte';

    export let users = [];
    let isEditing = false;
    export let showNotification = false;
    
    let isOpen = false;
    let isNotif = false;

    function toggleDropdown() {
        isOpen = !isOpen;
    }

    function toggleDropdownNotif() {
        isNotif = !isNotif;
    }

    function bellIcon() {
        console.log("clickkkkk");
        showNotification = true;
    }

    function toggleEditMode() {
        isEditing = !isEditing;
    }
</script>

<section id="commentSection" class="bg-white flex flex-col min-h-screen w-[35%]">
    <section>
        <div class="flex flex-row m-2.5">
            <input class="bg-customGray text-xxl text-black m-4 max-w-[px] p-1" placeholder="Search...">
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
                    <button on:click={toggleDropdownNotif} class="ml-2 z-10 cursor-pointer"> 
                        <BellSvg/>
                        {#if isNotif}
                        <ul class="absolute z-10 right-0 mt-2 w-48 bg-[#6C6C6C] rounded shadow-lg">
                            <li class="px-4 py-2 hover:bg-gray-200">Notif 1</li>
                            <li class="px-4 py-2 hover:bg-gray-200">Notif 2</li>
                            <li class="px-4 py-2 hover:bg-gray-200">Notif 3</li>
                            <li class="px-4 py-2 hover:bg-gray-200">Notif 4</li>
                        </ul>
                        {/if}
                    </button>
                </ul>
            </div>
        </div>
        <section class="flex flex-col h-screen">
            <div class="flex flex-col h-[15vh] mb-8 relative">
                <div class="bg-[#0094FF] h-[60%] flex relative"></div>
                <div class="flex group absolute top-8 left-10">
                    <img class="h-[120px] w-[120px] rounded-lg bg-slate-400">
                    <span class="flex text-sm ml-2 h-[3vh] items-center font-bold relative top-16">
                        {#each users as user}
                            {#if user.id == 1}
                                {user.name}
                            {/if}
                        {/each}
                    </span>
                </div>
            </div>
            <div>
                <div>
                    <span class="flex font-bold ml-2">About</span>
                    <div class="flex justify-center">
                        <About {toggleEditMode} {users} isEditing={isEditing} />
                    </div>
                </div>
            </div>
            <div class="flex flex-row justify-center">
                <button class="m-2 w-[86px] h-[32px] bg-[#D9D9D9] text-black font-inter text-base font-bold leading-normal">Abonnés</button>
                <button class="m-2 w-[124px] h-[32px] bg-[#D9D9D9] text-black font-inter text-base font-bold leading-normal">Abonnements</button>
            </div>

            <!-- Limit the height of the members list and allow it to scroll -->
            <div class="flex flex-col mt-4 mb-4 w-full overflow-y-auto h-[300px]">
                <div class="flex flex-col">
                    {#each users as user}
                        <div class="flex flex-row m-2">
                            <span class="h-[35px] w-[35px] bg-customPP rounded-sm mr-4 p-2"></span>
                            <p class="bg-customGray flex items-center w-full p-2">Membre {user.id}</p>
                        </div>
                    {/each}
                </div>
            </div>
        </section>
    </section>
</section>
