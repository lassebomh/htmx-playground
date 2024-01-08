
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

function getContacts(page) {
    faker.seed(page)

    let contacts = []

    for (let i = 0; i < 5; i++) {
        contacts.push({
            name: faker.person.fullName(),
            phoneNr: faker.phone.number(),
        })
    }

    return contacts
}

on.get("/", (request) => {

    let context = {
        contacts: getContacts(1),
        nextPage: 2
    }

    return render(request, 'index.html', context)
})

on.get("/contacts", async (request, page) => {

    page = parseInt(page)

    let context = {
        contacts: getContacts(page),
        nextPage: page+1,
    }

    await sleep(500);

    return render(request, 'loadmore.html', context)
})
