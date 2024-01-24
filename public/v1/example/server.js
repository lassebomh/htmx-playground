
import { router, render } from '/lib.js';

let counter = 0;

router.get('/', (request) => {
    let context = {
        text: "Click me!",
    }
    return render(request, 'index.html', context)
})

router.get('/increment', (request) => {
    counter++;

    let context = {
        text: counter,
    }
    return render(request, 'button.html', context)
})

router.listen();