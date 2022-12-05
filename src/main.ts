import App from './App.svelte'
import './assets/app.css'
import 'highlight.js/styles/github-dark.css'

nunjucks.configure('views', {
  autoescape: false,
});

const app = new App({
  target: document.body
})

export default app
