
// export default app

async function loadAssets() {
  await import('/public/ace/src-min/ace.js');
  ace.config.set('basePath', './ace/src-min/');
  
  const App = (await import('./App.svelte')).default

  import('./assets/app.css')
  import('highlight.js/styles/github-dark.css')

  new App({
    target: document.getElementById("app")
  })
}

if (localStorage.getItem('popup-shown') == 'true') {
  loadAssets()
}

window.closePopup = () => {
  document.body.classList.add('hide-popup')

  if (localStorage.getItem('popup-shown') !== 'true') {
      localStorage.setItem('popup-shown', 'true')
      loadAssets();
  }
}