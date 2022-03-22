"use strict";

// VARS, ARRAY, AND OBJ
const glitchMovies = 'https://future-cloudy-parsnip.glitch.me/movies';


/**
 * FUNCTIONS
 */
// MOVIE
function getMovies() {
    return fetch(glitchMovies).then((response) => response.json())
}
function simpleCard(movie){
    let output = `
            <div class="movie-card card">
                <div class="card-body m-3">
                    <div class="card-img-top">
                    <picture>
                        <img src="${movie.poster}" alt="Movie Poster" class="img-thumbnail">
                    </picture>
                    </div>
                    <ul class="list-group">
                        <li>Title: ${movie.title}</li> 
                        <li>Rating: ${movie.rating}</li> 
                        <li>Description: ${movie.plot}</li> 
                        <li>Genre: ${movie.genre}</li>
                        <li>Year: ${movie.year}</li>
                        <li>Director: ${movie.director}</li>
                        <li>Actors/Actresses: ${movie.actors}</li>
                        <li>ID: ${movie.id}</li>
                    </ul>
                </div>
                <div class="card-footer">
                    <button>Delete</button>
                    <button class="edit-btn">Edit</button>
                </div>
            </div>
            
            ${addJSButtons()}
    `
    // console.log(output);
    return output;
}

// MODAL
function addJSButtons(){
        return `
        <script>
            $('.edit-btn').click( () => {
                $('#edit-modal').css('display', 'inline');
            })
            
            $('.close-btn').click( () => {
                $('#edit-modal').css('display', 'none');
                console.log('click')
            }) 
            
        </script>
    `
}



// FORM
const movie = {
    title:  "Bambi",
    rating: "3"
}
const options = {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
};
const fetchMovies = () => {
        fetch(glitchMovies, options)
        .then((response) => console.log(response))
        .catch((reject) => console.log(reject));
};
/**
 * ACTIVATE
 */
getMovies().then( (movieList) => {
    let output = ''
    for (let i = 0; i < movieList.length; i++) {
        output += simpleCard(movieList[i]);
    }
    $('#movie-container').html(output);
})


