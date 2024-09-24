<script>
   import { goto } from '$app/navigation'; // Import the SvelteKit navigation function
  import Notification from '../Notification.svelte';
   import Sidebar from '../Sidebar.svelte';
     import { onMount } from 'svelte';


    let users = [];
    let posts = []
    let comments = []
    let selectedPostComments = []; 
    let albums = [];
    let photos = [];
    let showNotification = false;


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


//     async function fetchCookieValue() {

//        try {
//            const response = await fetch('http://localhost:8080/verificationSessionId', {
//                method: 'POST',
//                body: JSON.stringify(cookieValue)
//            });

//            if (response.ok) {
//                const result = await response.json();
//                 if (result.hasOwnProperty("Success")) {
//                 console.log('File and data uploaded successfully:', result);
//                 //Setting the cookie if the user is already registered

//                } else {
//                 goto('/');
//                 return
//                }
//            } else {
//                console.error('Cookie not valid');
//            }
//        } catch (error) {
//            console.error('Error with the cookie:', error);
//        }
//    }

  
  export function deleteCookie() {
      var res = document.cookie;
      var arrayCookie = res.split(";");
      for(var i = 0; i < arrayCookie.length; i++) {
          var key = arrayCookie[i].split("=");
          document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
      }
      goto('/')
   }


    // fetchCookieValue()
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

    function bellIcon() {
        console.log("clickkkkk");
        selectedPostComments = []; 
        showNotification = true
    }

    



</script>


<section class="flex min-h-screen bg-gray-100">
    <Sidebar { users } { albums } { photos } />
    <section class="flex min-h-screen w-full">
        <section class="flex flex-col bg-gray-200 min-h-screen w-[80%]">
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
        <section id="commentSection" class="bg-gray-600 flex flex-col min-h-screen w-max-[35vw]">
            <div class="flex flex-row">
                <input class="text-xxl  text-blue-500 m-4  max-w-[px] p-1" placeholder="Search...">
                <div class="flex items-center align-middle">
                    <ul class="flex flex-row items-center w-[12vw] h-[7vh] justify-center">
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
                <div class="flex flex-col justify-center items-center w-[33vw]">
                    <!-- Render the comments for the selected post -->
                    {#if selectedPostComments.length > 0}
                        {#each selectedPostComments as comment}
                            <div class="flex flex-col bg-white h-auto p-1 m-3 text-xs text-center justify-center w-[95%]">
                                <div class="flex flex-col justify-around p-4">  
                                    <div><strong>Name:</strong> {comment.name}</div>
                                    <div><strong>Email:</strong> {comment.email}</div>
                                    <div><strong>Body:</strong> {comment.body}</div>
                                </div>
                            </div>
                        {/each}
                    {:else if showNotification === true}
                        <Notification/>
                    {:else}
                        <p class="flex justify-center text-center text-xl">No comments available, please select a post.</p>
                    {/if}
                </div>
            </div>
        </section>
    </section>
</section>


