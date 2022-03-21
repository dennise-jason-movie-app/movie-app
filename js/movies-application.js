"use strict";


const glitchMovies = 'https://future-cloudy-parsnip.glitch.me/movies'

function getMovies() {
    return fetch(glitchMovies).then((response) => response.json())
}

getMovies().then( (movieList) => {
const movieOutput = document.getElementById('movieOutput');
movieOutput.innerHTML = movieList[0].title;
    console.log(movieList[0].title, movieList)
})
