"use strict";


const glitchMovies = 'https://future-cloudy-parsnip.glitch.me/movies'

function getMovies() {
    return fetch(glitchMovies).then((response) => response.json())
}

getMovies().then( (movieList) => {
    console.log(movieList)
})