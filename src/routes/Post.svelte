<script>
  import ClosePostSvg from "./ClosePostSvg.svelte";
  import SparklesSvg from "./SparklesSvg.svelte";

  export let resultUserInfo 
  export let closeModal;

  console.log("In Post component: ",resultUserInfo);

  let authorId = resultUserInfo.ID
  let text = ""
  let image = ""
  let creationDate

  const PostData = {
    AuthorId: authorId,
    Text: text,
    Image: image,
    CreationDate: creationDate,
  }


</script>

<div class="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
  <div class="bg-white p-6 rounded-lg shadow-lg w-[50vw] h-[50vh]">
  <div class="flex items-center text-center align-middle mb-4 justify-around">
    <div></div>
    <div class="flex justify-center">
        <h2 class="text-3xl font-bold">Créer une publication !</h2>
        <SparklesSvg/>
    </div>
    <button on:click={closeModal} class="flex cursor-pointer">
        <ClosePostSvg/>
    </button>
  </div>
  <div class="flex h-[10vh] items-center">
    <div class=" flex justify-center w-[8vw]">
        <img class="h-[60px] w-[60px] rounded-lg bg-slate-200" src="./basic-avatar.png" alt="Image for the group">
    </div>
    <div class=" w-full">
        <div class="flex p-0.5">{resultUserInfo.FirstName} {resultUserInfo.LastName}</div>
        <div class="flex p-0.5">Amis</div>
    </div>
  </div>
  <div class="flex items-center justify-center">
    <textarea class="bg-gray-100 flex justify-center items-center resize-none w-[45vw] h-[20vh]" bind:value={text}></textarea>
  </div>
    <button 
      class="mt-10 bg-blue-500 text-white px-4 py-2 text-lg rounded w-full" 
      >
      Publier
    </button>
  </div>
</div>