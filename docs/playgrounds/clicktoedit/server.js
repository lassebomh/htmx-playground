
let contact = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com',
}

on.get("/", (request) => {
    return render(request, 'index.html', contact)
})

on.get("/contact", (request) => {
    return render(request, 'contact.html', contact)
})

on.get("/contact/edit", (request) => {
    return render(request, 'contact-edit.html', contact)
})

on.put("/contact", async (request) => {
    let formData = await request.formData()

    contact.firstName = formData.get('firstName')
    contact.lastName = formData.get('lastName')
    contact.email = formData.get('email')

    return render(request, 'contact.html', contact)
})