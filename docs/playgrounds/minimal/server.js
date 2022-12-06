
const movies = [
    "The Shawshank Redemption",
    "The Godfather",
    "The Dark Knight",
    "The Godfather Part II",
    "12 Angry Men",
    "Schindler's List",
    "The Lord of the Rings: The Return of the King",
    "Pulp Fiction",
];

let i = 0

on.post("/movie", (request) => {
    i = (i+1) % movies.length
    let context = {
        movie: movies[i]
    }
    return render(request, 'movie.html', context)
})
