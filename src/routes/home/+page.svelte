<script>
   import { goto } from '$app/navigation'; // Import the SvelteKit navigation function
//   import Notification from '../Notification.svelte';
  import Comment from '../Comment.svelte'
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

<section class="flex min-h-screen bg-gray-200">
    <Sidebar { users } { albums } { photos } />
    <section class="flex min-h-screen w-full">
        <section class="flex flex-col min-h-screen w-[80%]">
            <section>
                <div class="flex justify-between items-center mt-4">
                    <div class="flex items-center align-middle font-bold text-3xl text-blue-500 t-2 ml-2">Home</div>
                    <div class="flex justify-center items-center mr-2"> 
                        <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="33" fill="#1E1E1E"/>
                            <g id="Prototype WireFrame">
                            <path d="M-2609 -168C-2609 -169.105 -2608.1 -170 -2607 -170H752C753.104 -170 754 -169.105 754 -168V2897C754 2898.1 753.104 2899 752 2899H-2607C-2608.1 2899 -2609 2898.1 -2609 2897V-168Z" fill="#444444"/>
                            <path d="M-2607 -169H752V-171H-2607V-169ZM753 -168V2897H755V-168H753ZM752 2898H-2607V2900H752V2898ZM-2608 2897V-168H-2610V2897H-2608ZM-2607 2898C-2607.55 2898 -2608 2897.55 -2608 2897H-2610C-2610 2898.66 -2608.66 2900 -2607 2900V2898ZM753 2897C753 2897.55 752.552 2898 752 2898V2900C753.657 2900 755 2898.66 755 2897H753ZM752 -169C752.552 -169 753 -168.552 753 -168H755C755 -169.657 753.657 -171 752 -171V-169ZM-2607 -171C-2608.66 -171 -2610 -169.657 -2610 -168H-2608C-2608 -168.552 -2607.55 -169 -2607 -169V-171Z" fill="white" fill-opacity="0.1"/>
                            <g id="Wire frame/ click profil picture">
                            <rect width="1423" height="794" transform="translate(-968 -11)" fill="#F8F9FA"/>
                            <g id="Frame 30">
                            <rect width="1355" height="55" transform="translate(-900 -11)" fill="white"/>
                            <g id="Frame 28">
                            <g id="maps_ugc_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24 1">
                            <path id="Vector" d="M1.33325 31.1666L3.93325 22.2333C3.51103 21.3222 3.19436 20.3888 2.98325 19.4333C2.77214 18.4777 2.66659 17.5 2.66659 16.5C2.66659 14.6555 3.01659 12.9222 3.71659 11.3C4.41659 9.67774 5.36659 8.26663 6.56659 7.06663C7.76659 5.86663 9.1777 4.91663 10.7999 4.21663C12.4221 3.51663 14.1555 3.16663 15.9999 3.16663C17.8444 3.16663 19.5777 3.51663 21.1999 4.21663C22.8221 4.91663 24.2333 5.86663 25.4333 7.06663C26.6333 8.26663 27.5833 9.67774 28.2833 11.3C28.9833 12.9222 29.3333 14.6555 29.3333 16.5C29.3333 18.3444 28.9833 20.0777 28.2833 21.7C27.5833 23.3222 26.6333 24.7333 25.4333 25.9333C24.2333 27.1333 22.8221 28.0833 21.1999 28.7833C19.5777 29.4833 17.8444 29.8333 15.9999 29.8333C14.9999 29.8333 14.0221 29.7277 13.0666 29.5166C12.111 29.3055 11.1777 28.9888 10.2666 28.5666L1.33325 31.1666ZM5.26659 27.2333L9.53325 25.9666C9.84436 25.8777 10.161 25.8444 10.4833 25.8666C10.8055 25.8888 11.111 25.9666 11.3999 26.1C12.111 26.4555 12.8555 26.7222 13.6333 26.9C14.411 27.0777 15.1999 27.1666 15.9999 27.1666C18.9777 27.1666 21.4999 26.1333 23.5666 24.0666C25.6333 22 26.6666 19.4777 26.6666 16.5C26.6666 13.5222 25.6333 11 23.5666 8.93329C21.4999 6.86663 18.9777 5.83329 15.9999 5.83329C13.0221 5.83329 10.4999 6.86663 8.43325 8.93329C6.36659 11 5.33325 13.5222 5.33325 16.5C5.33325 17.3 5.42214 18.0888 5.59992 18.8666C5.7777 19.6444 6.04436 20.3888 6.39992 21.1C6.55547 21.3888 6.63881 21.6944 6.64992 22.0166C6.66103 22.3389 6.62214 22.6555 6.53325 22.9666L5.26659 27.2333ZM14.6666 21.8333H17.3333V17.8333H21.3333V15.1666H17.3333V11.1666H14.6666V15.1666H10.6666V17.8333H14.6666V21.8333Z" fill="#6C6C6C"/>
                            </g>
                            </g>
                            </g>
                            </g>
                            </g>
                        </svg>
                    </div>
                </div>
                <!-- <textarea class="h-7 w-96 m-2" placeholder="Ecrire le contenu du post"></textarea> -->
                    <div class="bg-white m-2.5 h-screen overflow-auto flex flex-col items-center">
                        <!-- Render the fetched posts -->
                        {#if posts.length > 0}
                            {#each posts as post}
                                <button on:click={displaySectionComment(post.id)} id="postDiv" class="flex flex-col bg-white h-auto p-2 mt-4 mb-4 hover:scale-103 w-[95%]">
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
        <Comment {bellIcon} {selectedPostComments} {showNotification} />
    </section>
</section>


