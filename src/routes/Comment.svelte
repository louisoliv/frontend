<script>
export let selectedPostComments = [];  
</script>

    <div class="h-screen overflow-auto">
        <!-- <button on:click={hideSectionComment}>X</button> -->
        <div class="flex flex-col">
            <!-- Render the comments for the selected post -->
            {#if selectedPostComments.length > 0}
                    <span class="font-bold ml-2">Commentaires</span>

                {#each selectedPostComments as comment}
                    <div class="flex flex-col bg-gray-300 h-auto p-1 m-3 text-xs text-center">
                        <div class="flex flex-col justify-around p-4 w-[90%]">  
                            <!-- <div><strong>Name:</strong> {comment.name}</div>
                            <div><strong>Email:</strong> {comment.email}</div> -->
                            <div><strong>Author Id: </strong> {comment.AuthorId}</div>
                            <div><strong>Text</strong> {comment.Text}</div>
                            <div><strong>Creation Date: </strong> {comment.CreationDate}</div>
                            <div><strong>Like: </strong> {comment.LikeCount}</div>
                            <div><strong>Dislike: </strong> {comment.DislikeCount}</div>
                        </div>
                    </div>
                {/each}
            {:else}
                <p class="flex justify-center text-center text-xl">No  comments available, please select a post.</p>
            {/if}
        </div>
    </div>