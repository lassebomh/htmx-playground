import App from './App.svelte'
import './assets/app.css'
import 'highlight.js/styles/github-dark.css'

const app = new App({
  target: document.getElementById("app")
})

export default app
