"use strict";
/**
 * VARS, ARRAY AND OBJ
 */

//THIS TAKES THE DIV WITH THE ID TO PUT THE INFORMATION IN IT.
let output_information = document.getElementById('output-information');

//THIS IS THE URL THE INFORMATION IS COMING FROM.
const movies_url = 'https://marked-meadow-provelone.glitch.me/movies';

//THIS IS SO I COULD USE TEMPLATE LITERALS, BUT NOT SURE IF IT MAKES ANY DIFFERENCE.
const willBootStrapWorkStart = `<div class="card my-3 m-auto" style="max-width: 500px;">`
const cardDiv2 = `<div class="row g-0">`
const cardDiv3 = `<div class="col-4">`
const cardDiv4 = `<div class="col-8">`
const cardDiv5 = `<div class="card-body">`
const bootStrapCardTitle = `<h5 class="card-title">`
const theDetailsTag = `<details>`
const detailsEnd = `</details>`
const h5End = `</h5>`
const divEnd = `</div>`
const brTags = `<br>`

/**
 *  FUNCTIONS
 */
function callCards(movies){
    movies.forEach( (movie , index, a)  => {
        const movie_title    = movie.title   ;
        const movie_rating   = movie.rating  ;
        const movie_image    = movie.poster  ;
        const movie_year     = movie.year    ;
        const movie_genre    = movie.genre   ;
        const movie_director = movie.director;
        const movie_plot     = movie.plot    ;
        const movie_actors   = movie.actors  ;
        //I WAS RUNNING INTO ISSUES WITH THE IMAGE NOT SHOWING UP, SO I HAD TO PUT THE TAGS HERE.
        const theImage = `<img src="${movie_image}" class="w-100" alt="${movie_plot}">`
        // console.log( `${movie_title}` === "undefined"); // TRYING TO GET RID OF UNDEFINED.           // <-TEST
        // console.log(  Object.keys(movie) ); // TESTING .LENGTH, TO GET RID OF UNDEFINED.             // <-TEST
        //Object.keys(movie).length > 2 // TESTING IF STATEMENTS                                        // <-TEST
        //OBJECT LITERALS
        if (`${movie_title}` !== "undefined") { //DECIDED TO GO WITH THIS IF STATEMENT
            output_information.innerHTML += `
					${willBootStrapWorkStart}
					${cardDiv2}
					${cardDiv3}
								 ${theImage}
					${divEnd}
					${cardDiv4}
					${cardDiv5}
					${bootStrapCardTitle}Title:      ${movie_title} ${h5End}
							Rating:		${movie_rating}
					${theDetailsTag}
							Year:	 	${movie_year}     ${brTags}
							Genre:	 	${movie_genre}    ${brTags}
							Director:	${movie_director} ${brTags}
							Plot:	 	${movie_plot}     ${brTags}
							Actors:	 	${movie_actors}   ${brTags}
					${detailsEnd}
					${divEnd}
					${divEnd}
					${divEnd}
					${divEnd}
					`
        }
    });
}

function makeMovieObj(){
    return {
        title: $('#title-input').val(),
        director: $('#director-input').val(),
        year: $('#year-input').val(),
        genre: $('#genre-input').val(),
        actors: $('#actors-input').val(),
        plot: $('#plot-input').val(),
        rating: $('#rating-input').val(),
        poster: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.alamy.com%2Fstock-photo%2Fbatman-film-poster.html&psig=AOvVaw0zcqgCCGmMI49kZc59UpXi&ust=1648158389307000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNDen8-a3fYCFQAAAAAdAAAAABAD'
    }
}




/**
 * ACTIONS
 */
function addMovieAction(movie){
    const addOption = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
    };
    fetch(movies_url, addOption)
        .then(() =>console.log('Added Movie'))
        .catch((error) => console.log('Failed to Add Movie: ', error))
        .then(function(){
            postingCardsAction();
        })

}
function postingCardsAction(){
    fetch(movies_url).then( (response) => {
        response.json()
            .then( (movies) => {                                   //   <--FETCH
                callCards(movies);
            })
    });
}


/**
 * EVENT LISTENERS
 */
$('#add-movies-btn').click((e) => {
    e.preventDefault();
    const movie = makeMovieObj();
    // console.log(movie);
    addMovieAction(movie);
})



/**
 * INITIATE
 */
postingCardsAction();



// output_information.innerHTML += movies_url;

