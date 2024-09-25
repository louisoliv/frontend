<script>
    export {deleteCookie} from './home/+page.svelte'
    export let users = [];
    export let albums = [];
    export let photos= [];
</script>

<section class="relative flex min-h-screen">
    <section class="flex flex-col bg-gray-800 min-h-[110vh] w-20 ">
        <svg class="m-3" width="40" height="45" viewBox="0 0 40 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.6186 22.7438C24.4697 21.6726 24.923 20.3395 24.9013 18.9716C24.8797 17.6036 24.3844 16.2855 23.4998 15.2418C22.6153 14.1981 21.3962 13.4935 20.0503 13.2478C18.7045 13.0022 17.315 13.2308 16.1188 13.8948C14.9226 14.5587 13.9937 15.6169 13.4902 16.889C12.9867 18.1611 12.9399 19.5684 13.3577 20.8711C13.7755 22.1739 14.6321 23.2914 15.7815 24.0334C16.931 24.7754 18.3021 25.0958 19.6613 24.9402" stroke="#00A3FF" stroke-width="2"/>
            <path d="M13.6544 41.3882C13.6544 41.3882 3.01751 40.8831 2.06373 35.7327C1.10995 30.5823 11.1565 7.91049 12.5449 5.88337C13.9333 3.85624 15.3187 2 20.3116 2C25.3045 2 25.8593 4.21907 26.9688 6.43813C28.0784 8.6572 37 33.5 37 33.5C37 33.5 40.5 42 35 42.5C29.5 43 26.8622 42.9813 24.5729 40.8831C22.2837 38.7848 20.7578 32.8713 20.7578 32.8713H15.5" stroke="#00A3FF" stroke-width="3"/>
        </svg>
        {#each users as user, userIndex (userIndex)}
        {#each albums as album, albumIndex (albumIndex)}
            {#if album.userId == user.id && (albumIndex == 0 || album.userId !== albums[albumIndex - 1].userId)}
            {#each photos as photo, photoIndex (photoIndex)}
            {#if photo.albumId == album.id && (photoIndex == 0 || photo.albumId !== photos[photoIndex - 1].albumId)}
              <div class="group relative flex items-center justify-center">
                <img class="rounded-full max-w-[64px] m-1" src={photo.url} alt="Album photo" />
                <!-- User name appears on hover -->
                <p class="absolute left-full bg-gray-900 text-white text-sm rounded px-7 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {user.name}
                </p>
            </div>
            {/if}
            {/each}
            {/if}
        {/each}
        {/each}
        <a href="/message" class="rounded-full bg-blue-500 text-white max-w-[64px] min-h-[64px] m-1 mt-10 text-center items-center justify-center flex"><button>+</button></a>
        <a href="/profile" class="rounded-full bg-yellow-600 text-white max-w-[64px] min-h-[64px] m-1 mt-10 text-center items-center justify-center flex"><button>Profile</button></a>
        <!-- <button class="rounded-full bg-red-600 m-1 text-sm p-1" on:click={deleteCookie}>Log out</button> -->
    </section>
    <section class="flex flex-col bg-zinc-00 min-h-screen z-0 items-center w-[90%]">
        <!-- <input class="ml-2 text-2xl  text-blue-500 my-4 ms-20 max-w-[px] p-2" placeholder="Search..."> -->
        <div class="flex h-[7vh]">
            <input class="text-xxl  text-blue-500 m-4 max-w-[px] p-1" placeholder="Search...">
        </div>
        <div class="bg-white flex flex-col h-[30vh] w-[90%] justify-center items-center mt-4 mb-4">Evénements</div>
        <div class="flex flex-col bg-white mt-4 mb-4 h-[55vh] w-[90%] justify-center items-center">
            <p class="margin-inline-start">Nom de Groupe</p>
            <p class="margin-inline-start">Nom de Groupe</p>
            <p class="margin-inline-start">Nom de Groupe</p>
            <p class="margin-inline-start">Nom de Groupe</p>
            <p class="margin-inline-start">Nom de Groupe</p>
            <p class="margin-inline-start">Nom de Groupe</p>
            <p class="margin-inline-start">Nom de Groupe</p>
        </div>
        <div>
            <a href="/" class="bg-blue-500 p-2 rounded-xl text-white"><button class="w-36 mt-6">New group</button></a>
        </div>
    </section>
</section>