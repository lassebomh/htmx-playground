<h1><a href="https://lassebomh.github.io/htmx-playground">HTMX Playground</a></h1>

<img src="./public/logo_full.png" alt="HTMX Playground" width="64" height="64">

<p>
    This is a simple code sandbox for playing around with HTMX. No setup needed!
</p>
<p>
    It allows you to write code in a backend-like environment, running entirely inside the browser. You can define endpoints within server.js and render your own templates. It will run a mock server that intercepts outgoing requests from HTMX. The request handling and templating engine should be very familiar to people who use Django. In principle, this project isn't specific to HTMX, so you are free to try out other libraries as well.
</p>
<p>
    Check out the examples! I've adapted them from the original <a href="https://htmx.org/examples/">htmx.org examples</a>.
</p>

<h2>Saving & sharing</h2>
<ol>
    <li>Press "Copy as JSON" in the top right.</li>
    <li>Upload the contents as a Gist, and enter the raw URL in "Load Playground"</li>
    <li>The URL on this page will update, and can now be shared.</li>
</ol>

<h2>Limitations</h2>
<ul>
    <li>No page navigation</li>
    <li>Limited mobile support</li>
</ul>

<h2>Libraries used</h2>
<ul>
    <li>Svelte</li>
    <li>Ace (code editor)</li>
    <li>PollyJS (mock server)</li>
    <li>Nunjucks (templating engine)</li>
</ul>

<h2>Contributing</h2>
<p>
    I made this project because I wanted it to exist, and nothing else. You are welcome to create issues, and I'll look into it when I have time, but expect a bumpy road if you want to extend the code yourself.
</p>
