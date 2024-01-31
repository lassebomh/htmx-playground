import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import preprocessReact from "svelte-preprocess-react/preprocessReact";

export default {
  preprocess: [vitePreprocess(), preprocessReact()],
}
