import App from './App.svelte'

nunjucks.configure('views', {
  autoescape: false,
});

const app = new App({
  target: document.body
})

export default app
