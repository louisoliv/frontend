<script>
   import { goto } from '$app/navigation'; // Import the SvelteKit navigation function
//   import Notification from '../Notification.svelte';
  import Comment from '../Comment.svelte'
  import CreatePostSvg from '../CreatePostSvg.svelte';
   import Sidebar from '../Sidebar.svelte';
     import { onMount } from 'svelte';


    let users = [];
    let firstNames = [];
    let lastNames = [];
    let albums = [];
    let photos = [];
    let showNotification = false;


    // Fetch data when the component is mounted
    // const fetchUsers = async () => {
    //     const response = await fetch('http://localhost:8080/getUser');
    //     users = await response.json();
    // };

    // const fetchPosts = async () => {
    //     const response = await fetch('http://localhost:8080/getPost')
    //     posts = await response.json();
    //     console.log("posts: ", posts);
    // };

    // const fetchComments= async () => {
    //     const response = await fetch('http://localhost:8080/getComment')
    //     comments = await response.json();
    //     console.log("comments: ", comments);
    // };

    // const fetchAlbums = async () => {
    //     const response = await fetch('https://jsonplaceholder.typicode.com/albums');
    //     albums = await response.json();
    // };
    // const fetchPhotos = async () => {
    //     const response = await fetch('https://jsonplaceholder.typicode.com/photos');
    //     photos = await response.json();
    // };




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


    async function fetchCookieValue(url, data) {
        console.log(url);
        console.log(data);
       try {
           const response = await fetch(url, {
               method: 'POST',
               body: JSON.stringify(data)
           });

           if (response.ok) {
               const result = await response.json();
               console.log("Result from fetch cookie value: ", result);
               console.log("url: ", url);
               return result
           } else {
               console.error('Cookie not valid');
           }
       } catch (error) {
           console.error('Error with the cookie:', error);
       }
   }

  
  export function deleteCookie() {
      var res = document.cookie;
      var arrayCookie = res.split(";");
      for(var i = 0; i < arrayCookie.length; i++) {
          var key = arrayCookie[i].split("=");
          document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
      }
      goto('/')
   }

   let posts = {
        AuthorId:cookieValue,
    }

   let comments = {
        AuthorId:cookieValue,
        // PostId: postId,
    }

   let selectedPostComments = []; 


    let resultPosts = []
    let resultComments = []

    async function allFetches () {
        let result = await fetchCookieValue('http://localhost:8080/verificationSessionId', cookieValue)
        if (!result.hasOwnProperty("Success")) {
            goto('/');
            return
        } 
        console.log("Result :", result);

        let fetchedPosts = await fetchCookieValue('http://localhost:8080/getPost', posts);
        if (!fetchedPosts.hasOwnProperty("Success")) {
            goto('/');
            return;
        }

        resultPosts = fetchedPosts.Posts
        console.log("Result Post . post: ", resultPosts);
        console.log("Result Comment: ", resultComments);
    
    }

    
   
    allFetches()
    // fetchUsers();
    // fetchPosts()
    // fetchComments()
    // fetchAlbums();
    // fetchPhotos();

    console.log("Result post after the fetch: ", resultPosts);
    
    let COMMENTS = []

    const findUserName = (userId) => {
        const user = users.find(user => user.id === userId);
        return user ? user.name : 'Unknown User';
    };


    const findCommentPosts = (postId) => {
        return COMMENTS.filter(comment => comment.PostId === postId);
    }


    async function displaySectionComment(postId) {

        let fetchedComments = await fetchCookieValue('http://localhost:8080/getComment', comments);
        if (!fetchedComments.hasOwnProperty("Success")) {
            goto('/');
            return;
        }
        
        COMMENTS = fetchedComments.Posts
        console.log("COMMENTS: ", COMMENTS);
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
                <div class="bg-white flex justify-between items-center mt-4 m-2.5 p-0.5">
                    <div class="flex items-center align-middle font-bold text-3xl text-blue-500 t-2 ml-2">Home</div>
                    <div class="flex justify-center items-center mr-2"> 
                    <CreatePostSvg/>
                    </div>
                </div>
                <!-- <textarea class="h-7 w-96 m-2" placeholder="Ecrire le contenu du post"></textarea> -->
                    <div class="bg-white m-2.5 max-h-screen overflow-auto flex flex-col items-center">
                        <!-- Render the fetched posts -->
                        {#if resultPosts.length > 0}
                            {#each resultPosts as post}
                                <button on:click={displaySectionComment(post.Id)} id="postDiv" class="flex flex-col bg-white h-auto p-2 mt-4 mb-4 hover:scale-103 w-[95%]">
                                    <div class="flex flex-row justify-between p-4">
                                        {#if post.Username} 
                                            <div class="flex">Username: {(post.Username)}</div>
                                        {:else}
                                            <div class="flex">{(post.FirstName)} {(post.LastName)}</div>
                                        {/if}
                                        
                                        <div class="flex">
                                            <div class="w-4 h-5 bg-red-500">{post.LikeCount}</div>
                                            <div class="w-4 h-5 bg-red-900"></div>
                                    
                                            <div class="w-4 h-5 bg-red-500">{post.DislikeCount}</div>
                                            <div class="w-4 h-5 bg-red-900"></div>
                                        </div>
                                        <!-- <div>Post ID: {post.id}</div> -->
                                    </div>
                                    <div class="flex p-2">Date: {post.CreationDate}</div>
                                    <div class="flex bg-gray-300 p-4">Body: {post.Text}</div>
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


