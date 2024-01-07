
on.get("/", (request) => {
    return render(request, 'index.html')
})

on.get("/modal", (request) => {
    return render(request, 'modal.html')
})
