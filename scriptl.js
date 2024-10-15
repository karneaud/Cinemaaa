Array.prototype.getRandomValue = function () {
    const randomIndex = Math.floor(Math.random() * this.length);
    return this[randomIndex];
};

Array.prototype.getRandomValues = function (numValues) {
    const shuffled = this.slice(); // Make a copy of the original array
    for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]]; // Swap elements
    }
    return shuffled.slice(0, numValues); // Return the first `numValues` elements
};



const arrowLeft = document.querySelector(".arrow_left");
const hamburger = document.querySelector(".hamburger");
const NowPlayingMoviesDiv = document.querySelector(".Now_playing_movies_div");
const leftArrow = document.querySelectorAll(".leftarrow");
const rightarrow = document.querySelectorAll(".rightarrow");
const lightDarkmode = document.querySelector(".light_darkmode");
const movieDetails = document.querySelector(".movie_details");
const sectionStory = document.querySelector(".section_story");
const posterBig = document.querySelector(".poster_big");
const hamburgerPhone = document.querySelector(".hamburgerphone");
const sidenavContainer = document.querySelector(".sidenav_container");
const overlaySideNavabar = document.querySelector(".overlay_side_navabar");
const sidenav = document.querySelector(".sidenav");
const alertMsg = document.querySelector(".alertMsg");
const okayBtn = document.querySelector(".okaybtn");
const searchbox = document.querySelector(".search");
const currentPopularMoviesDiv = document.querySelector(".current_popular_movies_div");
const TopRatedMoviesDiv = document.querySelector(".Top_rated_movies_div");
const menuulLI = document.querySelectorAll(".menu_ul li");

menuulLI.forEach(item => {
    item.addEventListener('click', function () {
        menuulLI.forEach(i => i.classList.remove('hovered'))
        item.classList.add('hovered');
    })

})

lightDarkmode.addEventListener("click", function () {
    document.body.classList.toggle("light");

    if (document.body.classList.contains(`light`)) {
        localStorage.setItem(`theme`, `light`)
    } else {
        localStorage.setItem(`theme`, `dark`);
    }
});

function settheme() {
    let currtheme = localStorage.getItem('theme');

    if (currtheme == 'light') {
        document.body.classList.add("light");
    } else {
        document.body.classList.remove("light");
    }
}

settheme()

arrowLeft.addEventListener("click", function () {
    document.body.classList.remove("minimize_siderbar");
});

hamburger.addEventListener("click", function () {
    document.body.classList.add("minimize_siderbar");
});

hamburgerPhone.addEventListener("click", function () {
    sidenavContainer.classList.add("sidenav_container_active");
    overlaySideNavabar.classList.add("sidenav_container_active");
});
overlaySideNavabar.addEventListener("click", function () {
    sidenavContainer.classList.remove("sidenav_container_active");
    overlaySideNavabar.classList.remove("sidenav_container_active");
    document.body.classList.remove("minimize_siderbar");
});


const outputTemplate = (movie, type, i) => {

    let url = "./movieDetail.html?id=" + encodeURIComponent(movie.id);

    return `<div class="${type}_movies" tabindex="${movie.tabindex}">
    <a class="posterlink" href=${url}>
        <img class="poster" data-id="${movie.id}" src="${movie.primaryImage.url}" alt="${movie.originalTitleText}">
    </a>
    <p class="movie_title">${movie.originalTitleText}</p>
    <div class="date_rating">
        <p class="date">${movie.releaseYear}</p><span class="dot dot2"></span>
        <p class="rating">${movie.ratingSummary.aggregateRating}
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
            </span>
        </p>
        <div class="category">${movie.genres.join(',')}</div>
    </div>
</div>`;
}

// const NowPlaying = async () => {
//     const res = await fetch(
//         `https://api.themoviedb.org/3/movie/now_playing?api_key=${myApi}&language=ta&page=1`
//     );
//     const data = await res.json();
//     const NowPlayingmovies = data.results;
//     return NowPlayingmovies;
// };


// const popularnow = async () => {
//     const res = await fetch(
//         `https://api.themoviedb.org/3/movie/popular?api_key=${myApi}&language=ta&page=1`
//     );
//     const data = await res.json();
//     const popularnowmovies = data.results;
//     return popularnowmovies;
// }

// const Toprated = async () => {
//     const res = await fetch(
//         `https://api.themoviedb.org/3/movie/top_rated?api_key=${myApi}&language=en-US&page=1`
//     );
//     const data = await res.json();

//     const Topratedmovies = data.results;
//     return Topratedmovies;
// }

// const NowPlayingfun = (movie) => {
//     let url = "./movieDetail.html?id=" + encodeURIComponent(movie.id);
//     return `<div class="Now_playing_movies" tabindex="${movie.tabindex + 1000}">
//     <a class="posterlink" href=${url}> <img class="poster" data-id="${movie.id
//         }" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title
//         }"></a>
//          <p class="movie_title">${movie.title}</p>
//          <div class="date_rating">
//              <p class="date">${dateFormatter(
//             movie.release_date
//         )}</p><span class="dot dot2"></span>
//              <p class="rating">${movie.vote_average
//         }<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
//                          height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
//                          <path
//                              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                      </svg></span></p>
//              <div class="category">Movie</div>
//              </div>
//          </div>`;
// };

// const currpopularfun = (movie) => {
//     let url = "./movieDetail.html?id=" + encodeURIComponent(movie.id);
//     return `<div class="current_popular_movies"  tabindex="${movie.tabindex + 2000}">
//     <a class="posterlink" href=${url}> <img class="poster" data-id="${movie.id
//         }" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title
//         }"></a>
//          <p class="movie_title">${movie.title}</p>
//          <div class="date_rating">
//              <p class="date">${dateFormatter(
//             movie.release_date
//         )}</p><span class="dot dot2"></span>
//              <p class="rating">${movie.vote_average
//         }<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
//                          height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
//                          <path
//                              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                      </svg></span></p>
//              <div class="category">Movie</div>
//              </div>
//          </div>`;
// };
// const topratedmoviesfun = (movie) => {
//     let url = "./movieDetail.html?id=" + encodeURIComponent(movie.id);
//     return `<div class="Top_rated_movies"  tabindex="${movie.tabindex + 3000}">
//     <a class="posterlink" href=${url}> <img class="poster" data-id="${movie.id
//         }" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title
//         }"></a>
//          <p class="movie_title">${movie.title}</p>
//          <div class="date_rating">
//              <p class="date">${dateFormatter(
//             movie.release_date
//         )}</p><span class="dot dot2"></span>
//              <p class="rating">${movie.vote_average
//         }<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
//                          height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
//                          <path
//                              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//                      </svg></span></p>
//              <div class="category">Movie</div>
//              </div>
//          </div>`;
// };

// FORMATA DATE
const dateFormatter = function (date) {
    let currdate = date;
    const newDate = currdate.slice(0, 4);
    return newDate;
};

var loaded = 0;




(async () => {
    const resp = await fetch('https://66f2f53171c84d8058775e3f.mockapi.io/shows'), showDb = await resp.json();

    window.showDb = showDb;

    showDb.getRandomValues(3).forEach((moviee, i) => {
        moviee.tabindex = 1000 + i;
        NowPlayingMoviesDiv.insertAdjacentHTML("beforeend", outputTemplate(moviee, 'Now_playing', i));
    });

    const NowPlayingMovies = document.querySelectorAll(".Now_playing_movies");
    NowPlayingMovies.forEach(
        (ele, i) => (ele.style.transform = `TranslateX(${i * 115}%)`)
    );

    showDb.getRandomValues(9).forEach((moviee, i) => {
        moviee.tabindex = 2000 + i;
        currentPopularMoviesDiv.insertAdjacentHTML("beforeend", outputTemplate(moviee, 'current_popular', i));
    });

    const current_popular_movies = document.querySelectorAll(".current_popular_movies");
    current_popular_movies.forEach(
        (ele, i) => (ele.style.transform = `TranslateX(${i * 115}%)`)
    );
    showDb.getRandomValues(12).forEach((moviee, i) => {
        moviee.tabindex = 3000 + i;
        TopRatedMoviesDiv.insertAdjacentHTML("beforeend", outputTemplate(moviee, 'Top_rated', i));
    });

    const Top_rated_movies = document.querySelectorAll(".Top_rated_movies");
    Top_rated_movies.forEach(
        (ele, i) => (ele.style.transform = `TranslateX(${i * 115}%)`)
    );

    loaded = 3;
})()

// NowPlaying().then((movies) => {
//     movies.forEach((moviee, i) => {
//         moviee.tabindex = i;
//         const htmll = NowPlayingfun(moviee);
//         NowPlayingMoviesDiv.insertAdjacentHTML("beforeend", htmll);
//     });

//     const NowPlayingMovies = document.querySelectorAll(".Now_playing_movies");
//     NowPlayingMovies.forEach(
//         (ele, i) => (ele.style.transform = `TranslateX(${i * 115}%)`)
//     );

//     loaded++;
// });


// popularnow().then((movies) => {
//     movies.forEach((moviee, i) => {
//         moviee.tabindex = i;
//         const htmll = currpopularfun(moviee);
//         currentPopularMoviesDiv.insertAdjacentHTML("beforeend", htmll);
//     });

//     const current_popular_movies = document.querySelectorAll(".current_popular_movies");
//     current_popular_movies.forEach(
//         (ele, i) => (ele.style.transform = `TranslateX(${i * 115}%)`)
//     );

//     loaded++;
// });


// Toprated().then((movies) => {
//     movies.forEach((moviee, i) => {
//         moviee.tabindex = i;
//         const htmll = topratedmoviesfun(moviee);
//         TopRatedMoviesDiv.insertAdjacentHTML("beforeend", htmll);
//     });

//     const Top_rated_movies = document.querySelectorAll(".Top_rated_movies");
//     Top_rated_movies.forEach(
//         (ele, i) => (ele.style.transform = `TranslateX(${i * 115}%)`)
//     );

//     loaded++;
// });



leftArrow.forEach(item => item.addEventListener('click', function () {
    if (item.parentElement.id == 'nowplaying') {
        Sidescroll(NowPlayingMoviesDiv, 'left', 2, 500, 15)
    }

    if (item.parentElement.id == 'Trendingmovies') {
        Sidescroll(currentPopularMoviesDiv, 'left', 2, 500, 15)
    }
    if (item.parentElement.id == 'toprated') {
        Sidescroll(TopRatedMoviesDiv, 'left', 2, 500, 15)
    }
}))

rightarrow.forEach(item => item.addEventListener('click', function () {
    if (item.parentElement.id == 'nowplaying') {
        Sidescroll(NowPlayingMoviesDiv, 'right', 2, 500, 15)
    }

    if (item.parentElement.id == 'Trendingmovies') {
        Sidescroll(currentPopularMoviesDiv, 'right', 2, 500, 15)
    }
    if (item.parentElement.id == 'toprated') {
        Sidescroll(TopRatedMoviesDiv, 'right', 2, 500, 15)
    }
}))




const Sidescroll = function (element, direction, speed, distance, step) {
    scrollAmount = 0
    let slideTimer = setInterval(function () {
        if (direction == 'left') {
            element.scrollLeft -= step;
        }
        else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if (scrollAmount >= distance) {
            window.clearInterval(slideTimer)
        }
    }, speed);

}




//  ALERT MESSAGE AT THE BEGINING//
/*
const hideAlert = function () {
    alertMsg.classList.remove('alertactive');
}

okayBtn.addEventListener('click', hideAlert)*/



searchbox.addEventListener('click', function () {
    location.replace("./search.html")
})

window.addEventListener('load', function () {
    if (document.title.includes('Home')) {
        menuulLI[0].classList.add('hovered');
    }

    var intvl = setInterval(function () {
        if (loaded >= 3) {
            setTimeout(function() { 
                loadScript();
                document.querySelector('.Now_playing_movies_div').focus();
                }, 3000);

            clearInterval(intvl);
        }
    }, 1000);
});




// Call the function with the URL of the JavaScript file you want to load



