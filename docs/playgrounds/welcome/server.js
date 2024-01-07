
let genres = [
    "Rock",
    "Electronic",
    "Country",
    "Heavy metal",
    "Hip hop",
    "Jazz",
    "Classical",
    "Soul",
    "Folk",
    "Reggae",
    "Techno",
    "Disco"
]

on.get("/", (request) => {

    let context = {
        text: "Click for a random music genre"
    }

    return render(request, 'index.html', context)
})

on.post("/random-genre", (request) => {
    
    let genre = genres[Math.floor(Math.random() * genres.length)]

    let context = {
        text: genre
    }

    return render(request, 'button.html', context)
})
