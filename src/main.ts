import App from './App.svelte'
import './assets/global.css'

const app = new App({
    target: document.body
})

if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js');

export default app
