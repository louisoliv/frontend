<script>
   import { goto } from '$app/navigation'; // Import the SvelteKit navigation function
     import { onMount } from 'svelte';


    let users = [];
    let posts = []
    let comments = []
    let selectedPostComments = []; 
    let albums = [];
    let photos = [];


    // Fetch data when the component is mounted
    const fetchUsers = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        users = await response.json();
    };

    const fetchPosts = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        posts = await response.json();
        console.log("posts: ", posts);
    };

    const fetchComments= async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments')
        comments = await response.json();
        console.log("comments: ", comments);
    };

    const fetchAlbums = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        albums = await response.json();
    };
    const fetchPhotos = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        photos = await response.json();
    };


    // function getCookieValue() {
    //     let theCookies = document.cookie.split(";"); // Split cookies by semicolon
    //     for (let i = 0; i < theCookies.length; i++) {
    //         let cookie = theCookies[i].trim(); // Remove leading spaces
    //         console.log("cookie is :",cookie);
    //         if (cookie.startsWith("sessionId=")) {
    //             return cookie.substring("sessionId=".length); // Get the value after "sessionId="
    //         }
    //     }
    //     return null; // Return null if sessionId cookie is not found
    // }

    //   let sessionId = null;

    //   onMount(() => {
    //     sessionId = getCookieValue(); // Only call this when the DOM is ready
    //     console.log("sessionId:", sessionId); // This will now log the sessionId
    //   });


    // Function to safely check if we are in the browser environment
    function isBrowser() {
        return typeof window !== 'undefined' && typeof document !== 'undefined';
    }

    // Function to get the cookie value, only run in the browser
    function getCookieValue() {
      if (isBrowser()) {
        console.log(document.cookie); // Safe access after the page is loaded
        let theCookies = document.cookie.split(";"); // Split cookies by semicolon
        for (let i = 0; i < theCookies.length; i++) {
          let cookie = theCookies[i].trim(); // Remove leading spaces
          console.log("cookie is:", cookie);
          if (cookie.startsWith("sessionId=")) {
            return cookie.substring("sessionId=".length); // Get the value after "sessionId="
          }
        }
      }
      return null; // Return null if sessionId cookie is not found
    }

    
    let cookieValue =  getCookieValue();
    console.log("Value of the cookie: ", cookieValue);


    async function fetchCookieValue() {

       try {
           const response = await fetch('http://localhost:8080/verificationSessionId', {
               method: 'POST',
               body: JSON.stringify(cookieValue)
           });

           if (response.ok) {
               const result = await response.json();
                if (result.hasOwnProperty("Success")) {
                console.log('File and data uploaded successfully:', result);
                //Setting the cookie if the user is already registered

               } else {
                goto('/');
                return
               }
           } else {
               console.error('Cookie not valid');
           }
       } catch (error) {
           console.error('Error with the cookie:', error);
       }
   }

  
   function deleteCookie() {
      var res = document.cookie;
      var arrayCookie = res.split(";");
      for(var i = 0; i < arrayCookie.length; i++) {
          var key = arrayCookie[i].split("=");
          document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
      }
      goto('/')
   }


    fetchCookieValue()
    fetchUsers();
    fetchPosts()
    fetchComments()
    fetchAlbums();
    fetchPhotos();


    let previousUserId = null;

    const findUserName = (userId) => {
        const user = users.find(user => user.id === userId);
        return user ? user.name : 'Unknown User';
    };

    const findCommentPosts = (postId) => {
        return comments.filter(comment => comment.postId === postId);
    }

    function onClick(event) {
        event.preventDefault()
        console.log("Hello");
    }

    function displaySectionComment(postId) {
        selectedPostComments = findCommentPosts(postId);
        let sectionComment = document.getElementById("commentSection")
        sectionComment.style.display = "flex"
    }

    function hideSectionComment() {
        let sectionComment = document.getElementById("commentSection")
        sectionComment.style.display = "none"
        selectedPostComments = []
    }


</script>


<section class="flex min-h-screen bg-gray-100">
    <section class="relative flex min-h-screen w-[280px]">
        <section class="group absolute left-0 flex flex-col bg-gray-800 min-h-[110vh] w-20 hover:w-52 z-10 transition-all duration-300">
            <svg class="m-3" width="54" height="52" viewBox="0 0 54 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="54" height="52" rx="14" fill="#007BFF"/>
                <path d="M16.484 36.892C15.668 36.924 14.916 36.82 14.228 36.58C13.556 36.356 13.004 36.044 12.572 35.644C12.156 35.244 11.892 34.78 11.78 34.252C11.668 33.708 11.764 33.156 12.068 32.596C12.484 31.924 13.316 31.724 14.564 31.996C15.508 32.188 16.156 32.292 16.508 32.308C16.876 32.324 17.188 32.276 17.444 32.164C18.612 31.78 19.268 31.364 19.412 30.916C19.508 30.58 19.3 30.188 18.788 29.74C18.58 29.548 18.348 29.356 18.092 29.164C17.836 28.972 17.62 28.78 17.444 28.588C16.644 27.996 16.012 27.316 15.548 26.548C15.1 25.764 14.916 24.916 14.996 24.004C15.076 23.092 15.228 22.34 15.452 21.748C15.676 21.14 15.956 20.604 16.292 20.14C16.884 19.324 17.652 18.66 18.596 18.148C19.684 17.588 20.556 17.228 21.212 17.068C22.508 16.78 23.82 16.756 25.148 16.996C25.596 17.076 25.98 17.228 26.3 17.452C26.62 17.676 26.94 17.908 27.26 18.148C27.82 18.708 27.956 19.276 27.668 19.852C27.556 20.108 27.38 20.316 27.14 20.476C26.9 20.636 26.644 20.724 26.372 20.74C26.404 21.172 26.324 21.492 26.132 21.7C25.764 22.068 25.124 22.308 24.212 22.42C22.9 22.324 22.012 22.396 21.548 22.636C21.004 22.924 20.804 23.548 20.948 24.508C20.98 24.716 21.108 24.932 21.332 25.156C21.572 25.38 21.844 25.62 22.148 25.876C22.468 26.132 22.796 26.42 23.132 26.74C23.484 27.06 23.788 27.428 24.044 27.844C24.94 29.316 24.868 31.036 23.828 33.004C23.06 34.476 21.748 35.58 19.892 36.316C18.932 36.7 17.796 36.892 16.484 36.892ZM27.3742 26.188C27.6942 25.116 27.9502 24.292 28.1422 23.716C28.3502 23.124 28.5502 22.596 28.7422 22.132C28.9342 21.668 29.1502 21.22 29.3902 20.788C29.6462 20.356 29.9182 19.964 30.2062 19.612C30.5102 19.244 30.8302 18.956 31.1662 18.748C31.5022 18.54 31.8542 18.436 32.2222 18.436C32.5902 18.436 32.9742 18.58 33.3742 18.868C34.0142 20.468 34.4062 21.54 34.5502 22.084C34.7422 22.884 34.9182 24.012 35.0782 25.468C35.2222 25.1 35.3822 24.716 35.5582 24.316C35.7502 23.9 35.9342 23.484 36.1102 23.068C36.6062 22.012 36.9182 21.212 37.0462 20.668C37.3982 19.548 38.1262 18.708 39.2302 18.148C40.1902 17.668 41.0862 17.516 41.9182 17.692C42.2542 17.756 42.4862 17.892 42.6142 18.1C42.7582 18.308 42.7582 18.524 42.6142 18.748C42.4862 18.972 42.4382 19.188 42.4702 19.396C42.5182 19.588 42.5582 19.82 42.5902 20.092C42.6382 20.828 42.5102 21.484 42.2062 22.06C41.9022 22.62 41.5902 23.324 41.2702 24.172C40.9502 25.004 40.6222 25.892 40.2862 26.836C39.9662 27.78 39.6382 28.74 39.3022 29.716C38.9662 30.692 38.6382 31.58 38.3182 32.38C37.6142 34.22 37.0382 35.236 36.5902 35.428C35.9822 35.796 35.5342 36.012 35.2462 36.076C34.8782 36.14 34.3582 36.14 33.6862 36.076C33.2702 36.044 32.9102 35.508 32.6062 34.468C32.4302 33.908 32.2702 33.132 32.1262 32.14C31.8702 30.412 31.6942 29.46 31.5982 29.284C30.9582 31.364 30.5022 32.676 30.2302 33.22C29.9742 33.764 29.7742 34.124 29.6302 34.3C29.5022 34.476 29.3422 34.708 29.1502 34.996C28.9422 35.572 28.4462 35.996 27.6622 36.268C26.9902 36.524 26.3822 36.564 25.8382 36.388C25.2462 36.196 25.0702 35.828 25.3102 35.284C25.4862 33.364 26.1742 30.332 27.3742 26.188Z" fill="white"/>
            </svg>
            {#each users as user, userIndex (userIndex)}
            {#each albums as album, albumIndex (albumIndex)}
                {#if album.userId == user.id && (albumIndex == 0 || album.userId !== albums[albumIndex - 1].userId)}
                {#each photos as photo, photoIndex (photoIndex)}
                {#if photo.albumId == album.id && (photoIndex == 0 || photo.albumId !== photos[photoIndex - 1].albumId)}
                <button class="flex items-center hover:bg-blue-500 rounded-lg ">
                    <img class="rounded-full max-w-[64px] m-1" src={photo.url} alt="Album photo" />
                    <!-- Hide the paragraph by default and show it on hover -->
                    <p class="hidden group-hover:block text-white">{user.name}</p>
                </button>
                {/if}
                {/each}
                {/if}
            {/each}
            {/each}
            <button class="rounded-full bg-blue-500 text-white max-w-[64px] min-h-[64px] m-1">+</button>
            <a href="/profile" class="rounded-full bg-yellow-600 text-white max-w-[64px] min-h-[64px] m-1 mt-10 text-center items-center justify-center flex"><button>Profile</button></a>
            <button class="rounded-full bg-red-600 m-1 text-sm p-1" on:click={deleteCookie}>Log out</button>

        </section>
        <section class="flex flex-col bg-zinc-100 min-h-screen z-0 max-w-[280px] w-[280px]">
            <span class="ml-2 text-4xl  text-blue-500 font-bold my-4 ms-20">#Home</span>
            <p class="margin-inline-start ms-20">Nom de Groupe</p>
            <p class="margin-inline-start ms-20">Nom de Groupe</p>
            <p class="margin-inline-start ms-20">Nom de Groupe</p>
            <p class="margin-inline-start ms-20">Nom de Groupe</p>
            <p class="margin-inline-start ms-20">Nom de Groupe</p>
            <p class="margin-inline-start ms-20">Nom de Groupe</p>
            <p class="margin-inline-start ms-20">Nom de Groupe</p>
        </section>
    </section>
    <section class="flex min-h-screen">
        <section class="flex flex-col bg-gray-200 min-h-screen w-[950px]">
                <section>
                <textarea class="h-7 w-96 m-2" placeholder="Ecrire le contenu du post"></textarea>
                    <div class="m-2.5 h-screen overflow-auto">
                        <!-- Render the fetched posts -->
                        {#if posts.length > 0}
                            {#each posts as post}
                                <button on:click={displaySectionComment(post.id)} id="postDiv" class="flex flex-col bg-white h-auto p-2 mt-4 mb-4 hover:scale-103 w-full">
                                    <div class="flex flex-row justify-around p-4">
                                        <div>Username: {findUserName(post.userId)}</div>
                                        <div class="flex">
                                            <div class="w-4 h-5 bg-red-500"></div>
                                            <div class="w-4 h-5 bg-red-900"></div>
                                        </div>
                                        <div class="flex">
                                            <div class="w-4 h-5 bg-red-500"></div>
                                            <div class="w-4 h-5 bg-red-900"></div>
                                        </div>
                                        <!-- <div>Post ID: {post.id}</div> -->
                                    </div>
                                    <div class="flex p-2">Title: {post.title}</div>
                                    <div class="flex bg-gray-300 p-4">Body: {post.body}</div>
                                </button>
                            {/each}
                        {:else}
                        <p>Loading...</p>
                        {/if}
                    </div>
                </section>
        </section>
        <section id="commentSection" class="bg-gray-600 flex flex-col min-h-screen w-[500px]">
            
            <div class="h-screen overflow-auto">
                <!-- <button on:click={hideSectionComment}>X</button> -->

                <div>
                    <!-- Render the comments for the selected post -->
                    {#if selectedPostComments.length > 0}
                        {#each selectedPostComments as comment}
                            <div class="flex flex-col bg-white h-auto p-1 m-3 text-xs text-center">
                                <div class="flex flex-col justify-around p-4">
                                    <div><strong>Name:</strong> {comment.name}</div>
                                    <div><strong>Email:</strong> {comment.email}</div>
                                    <div><strong>Body:</strong> {comment.body}</div>
                                </div>
                            </div>
                        {/each}
                    {:else}
                        <p class="flex justify-center text-center text-xl">No comments available, please select a post.</p>
                    {/if}
                </div>
            </div>
        </section>
    </section>
</section>


