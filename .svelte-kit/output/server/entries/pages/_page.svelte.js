import { c as create_ssr_component, d as add_attribute } from "../../chunks/ssr.js";
import "../../chunks/client.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let Password = "";
  let ConfirmPassword = "";
  let Username = "";
  let Firstname = "";
  let Lastname = "";
  let BirthDate = "";
  let Mail = "";
  return `<form class="flex flex-col p-5 w-auto md:w-auto sm:w-auto lg:w-[25vw]"><div class="flex m-3 text-blue-500 text-3xl font-bold text-left" data-svelte-h="svelte-ljlnee">Create an account</div> <input type="text" id="Username" class="m-3 rounded-md p-1.5 border-2 border-gray-500" placeholder="Username"${add_attribute("value", Username)}> <input type="text" id="Firstname" class="m-3 rounded-md p-1.5 border-2 border-gray-500" placeholder="Firstname"${add_attribute("value", Firstname)}> <input type="text" id="Lastname" class="m-3 rounded-md p-1.5 border-2 border-gray-500" placeholder="Lastname"${add_attribute("value", Lastname)}> <input type="date" id="BirthDate" class="m-3 rounded-md p-1.5 border-2 border-gray-500" max="2024-12-31"${add_attribute("value", BirthDate)}> <select class="m-3 rounded-md p-1.5 border-2 border-gray-500" name="SelectGender" id="SelectGender"><option value="" data-svelte-h="svelte-hw79c5">Select Gender</option><option value="Homme" data-svelte-h="svelte-tauwcm">Homme</option><option value="Femme" data-svelte-h="svelte-1hymv66">Femme</option><option value="Ne pas répondre" data-svelte-h="svelte-4td7ta">Ne pas répondre</option></select> <input type="email" id="Mail" class="m-3 rounded-md p-1.5 border-2 border-gray-500" placeholder="Email"${add_attribute("value", Mail)}> <input type="password" id="Password" class="m-3 rounded-md p-1.5 border-2 border-gray-500" placeholder="Password"${add_attribute("value", Password)}> <input type="password" id="ConfirmPassword" class="m-3 rounded-md p-1.5 border-2 border-gray-500" placeholder="Confirm Password"${add_attribute("value", ConfirmPassword)}> <button type="submit" class="ml-auto m-3 p-1 border-2 rounded-md bg-blue-500 text-white w-40" data-svelte-h="svelte-phxrj3">Sign up baby</button></form>`;
});
export {
  Page as default
};
