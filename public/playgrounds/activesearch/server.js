import { faker } from 'https://cdn.skypack.dev/@faker-js/faker@v7.4.0';
import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.mjs'

faker.seed(42)

let contacts = []

for (let i = 0; i < 300; i++) {
    contacts.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
    })
}

const fuse = new Fuse(contacts, {
    keys: ['firstName', 'lastName'],
    includeScore: true
})

on.get("/", (request) => {
    return render(request, 'index.html', {
        results: []
    })
})

on.post("/search", async (request) => {
    let formData = await request.formData()
    let query = formData.get('search')

    let results = fuse.search(query)

    await sleep(500);

    return render(request, 'results.html', {
        results: results.slice(0, 8)
    })
})
