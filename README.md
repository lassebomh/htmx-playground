# [HTMX Playground](https://lassebomh.github.io/htmx-playground)

A simple code sandbox for playing around with HTMX. No setup needed!

It allows you to write code in a backend-like environment, running entirely inside the browser. You can define endpoints within `server.js` and render your own templates. It will run a mock server that intersepts outgoing requests from HTMX. The request handling and templating engine should be very familiar to people who use Django. The playground is run within a sandboxed iframe, and communicate with the main context with `window.parent.postMessage`.

If this helped you and you want to show your appreciation, then you are very welcome to [buy me a coffee ❤️](https://www.buymeacoffee.com/lassebomh).

## Limitations

 - There is no functionality to save or share playgrounds, but this might be implemented in the future.
 - `index.html` cannot contain templating.
 - No page navigation
 - No mobile support

The last two limitations are due to the fact that the server runs within the iframe of the page itself. Fixing this would require them to run in seperate iframes, and further complicate an already hacky solution.

## Libraries used

 - Svelte
 - Monaco (code editor)
 - PollyJS (mock server)
 - Nunjucks (templating engine)
