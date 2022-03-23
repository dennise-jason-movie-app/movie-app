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
                        <li>ID: ${movie.id}</li>
                    </ul>
                </div>
                <div class="card-footer">
                    <button id="del-btn-${movie.id}">Delete</button>
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
            // EDIT BTN
            $('.edit-btn').click( () => {
                $('#edit-modal').css('display', 'inline');
            })
            
            // MODAL CLOSE BTN
            $('.close-btn').click( () => {
                $('#edit-modal').css('display', 'none');
                console.log('click')
            }) 
           

        </script>
    `
}



// ADD
let titleInput = document.getElementById('title-input');
let ratingInput = document.getElementById('rating-input');

let movie = function (){
    return {
        title: titleInput.value,
        rating: ratingInput.value
    }
}

const options = {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie)
};

const fetchMovies = () => {

        fetch(glitchMovies, options)
        .then((response) => console.log(response))
        .catch((reject) => console.log(reject));
};

// DELETE

const delOption = {
    method: "DELETE",
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie)
}

const deleteMovie = (num) => {
    fetch((glitchMovies + '/' + num + ''), delOption)
        .then((response) => console.log(response))
        .catch((reject) => console.log(reject));
};



// EVENT LISTENERS
// const delMoviesBTN = document.getElementById('sanity');
// delMoviesBTN.addEventListener('click', deleteMovie);
// DELETE BTN


const addMoviesBTN = document.getElementById('add-movies-btn');
addMoviesBTN.addEventListener('click', fetchMovies);


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
//...