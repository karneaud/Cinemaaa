const posterBig = document.querySelector(".poster_big");
const movieDetailnavContainer = document.querySelector(
    ".movieDetailnavContainer"
);
const gradient = document.querySelector(".gradient");
const posterBigImg = document.querySelector(".poster_big_img");
const posterBBig = document.querySelector(".posterbig");
const arrowLeft = document.querySelector(".arrow_left");
const hamburger = document.querySelector(".hamburger");
const NowPlayingMoviesDiv = document.querySelector(".Now_playing_movies_div");
const leftArrow = document.querySelectorAll(".leftarrow");
const rightarrow = document.querySelectorAll(".rightarrow");
const lightDarkmode = document.querySelector(".light_darkmode");
const movieDetails = document.querySelector(".movie_details");
const sectionStory = document.querySelector(".section_story");
const movieDetailsAboutCategoryUl = document.querySelector(
    ".movie_details_about_category_ul"
);
const hamburgerPhone = document.querySelector(".hamburgerphone");
const sidenavChildContainer = document.querySelector(".sidenav_child_container");
const overlaySideNavabar = document.querySelector(".overlay_side_navabar");
const sidenav = document.querySelector(".sidenav");
const searchbox = document.querySelector(".search");
const recommendationMoviesDiv = document.querySelector(".recommendation_movies_div");
const SimilarMoviesDiv = document.querySelector(".Similar_movies_div");
const Casdiv = document.querySelector(".Casdiv");






const Castfun = (castee) => {
    //let url = "./personDetail.html?id=" + encodeURIComponent(castee.id);
    return `<div class="castdiv" >
            <div class="name_character_container">
                <figure>
                    <img src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg">
                    <figcaption>
                    <p class="movie_title">${castee.name}</p></figcaption>
                </figure>
                
             </div>
         </div>`;
};



let url = document.location.href;
let fetcid = url.slice(url.indexOf("=") + 1);
let loaded = 0;
window.addEventListener('load', function () {
    CurrMovie(fetcid).then(({ data }) => {
        let htm = "";
        htm = html2(data);
        movieDetails.innerHTML = htm;
        let BigPoster = Bigposter(data.poster_path ?? data.images.filter(i => i.image_type == 'BACKDROP')[0].file_path);
        posterBBig.innerHTML = BigPoster;
        sectionStory.textContent = data.overview;
        let castarr = data.cast;
        castarr.forEach(item => {
            const castehtml = Castfun(item);
            Casdiv.insertAdjacentHTML("beforeend", castehtml);
        })
        // const castdiv = document.querySelectorAll(".castdiv");
        // castdiv.forEach(
        //     (ele, i) => (ele.style.transform = `TranslateX(${i * 115}%)`)
        // );
        loaded = 3;
    });

});



searchbox.addEventListener('click', function () {
    location.replace("./search.html")
})




hamburgerPhone.addEventListener("click", function () {
    sidenavChildContainer.classList.add("sidenav_container_active");
    overlaySideNavabar.classList.add("sidenav_container_active");
    hamburgerPhone.classList.add("hamburgerphonedeactive");
});
overlaySideNavabar.addEventListener("click", function () {
    sidenavChildContainer.classList.remove("sidenav_container_active");
    overlaySideNavabar.classList.remove("sidenav_container_active");
    document.body.classList.remove("minimize_siderbar");
    hamburgerPhone.classList.remove("hamburgerphonedeactive");
});

window.addEventListener("scroll", function () {
    let intiCon = posterBBig.getBoundingClientRect();
    if (window.scrollY > intiCon.height - 150) {
        movieDetailnavContainer.classList.add("bgadd");
    } else {
        movieDetailnavContainer.classList.remove("bgadd");
    }
});



lightDarkmode.addEventListener("click", function () {
    document.body.classList.toggle("light");

    if (document.body.classList.contains(`light`)) {
        localStorage.setItem(`theme`, `light`);
    } else {
        localStorage.setItem(`theme`, `dark`);
    }
});

function settheme() {
    let currtheme = localStorage.getItem('theme');
    console.log(currtheme);
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


const NowPlaying = async () => {
    const res = await fetch(
        `https://66f2f53171c84d8058775e3f.mockapi.io/shows/`
    );
    const data = await res.json();
    const NowPlayingmovies = data.results;
    return NowPlayingmovies;
};











//<a class="posterlink" href="./movieDetail.html"></a>//
const NowPlayingfun = (movie) => {
    let url = "./movieDetail.html?id=" + encodeURIComponent(movie.id);
    return `<div class="Now_playing_movies" >
    <a class="posterlink" href="${url}"> <img class="poster" data-id="${movie.id
        }" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title
        }"></a>
         <p class="movie_title">${movie.title}</p>
         <div class="date_rating">
             <p class="date">${dateFormatter(
            movie.release_date
        )}</p><span class="dot dot2"></span>
             <p class="rating">${movie.vote_average
        }<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                         height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                         <path
                             d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                     </svg></span></p>
             <div class="category">Movie</div>
             </div>
         </div>`;
};








const dateFormatter = function (date) {
    let currdate = date;
    const newDate = currdate.slice(0, 4);
    return newDate;
};


const averagVoteformat = function (receivedVote) {
    let currVote = receivedVote.toString();
    const newVote = currVote.slice(0, 3);
    return newVote;
};






// NowPlaying().then((movies) => {
//     movies.forEach((moviee) => {
//         const htmll = NowPlayingfun(moviee);
//         NowPlayingMoviesDiv.insertAdjacentHTML("beforeend", htmll);
//     });

//     const NowPlayingMovies = document.querySelectorAll(".Now_playing_movies");
//     NowPlayingMovies.forEach(
//         (ele, i) => (ele.style.transform = `TranslateX(${i * 115}%)`)
//     );
// });






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

leftArrow.forEach(item => item.addEventListener('click', function () {
    if (item.parentElement.id == 'nowplayin') {
        Sidescroll(NowPlayingMoviesDiv, 'left', 2, 500, 15)
    }
    if (item.parentElement.id == 'recommenn') {
        Sidescroll(recommendationMoviesDiv, 'left', 2, 500, 15)
    }
    if (item.parentElement.id == 'Similarovie') {
        Sidescroll(SimilarMoviesDiv, 'left', 2, 500, 15)
    }
    if (item.parentElement.id == 'cast_con') {
        Sidescroll(Casdiv, 'left', 2, 500, 15)
    }

}));


rightarrow.forEach(item => item.addEventListener('click', function () {
    if (item.parentElement.id == 'nowplayin') {
        Sidescroll(NowPlayingMoviesDiv, 'right', 2, 500, 15)
    }
    if (item.parentElement.id == 'recommenn') {
        Sidescroll(recommendationMoviesDiv, 'right', 2, 500, 15)
    }
    if (item.parentElement.id == 'Similarovie') {
        Sidescroll(SimilarMoviesDiv, 'right', 2, 500, 15)
    }
    if (item.parentElement.id == 'cast_con') {
        Sidescroll(Casdiv, 'right', 2, 500, 15)
    }
}));














/* MOVIE CLCIKED*/

const html2 = function (moviee) {
    document.title = `${moviee.title + " " + "(" + moviee.release_date.substr(-1, 4) + ")" + " " + "|" + " " + "Cinemaa"}`;

    let cate = "", poster_path = moviee.poster_path ?? moviee.images.filter(i => i.image_type == 'POSTER')[0].file_path;
    moviee.genres.forEach((genre) => {
        cate += `<li class="movie_details_category_ul_li">${genre.name}</li>`;
    });

    return `<div class="movie_details">
    <img class="movie_details_poster" src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${poster_path}" alt="${moviee.title}">
    <div class="movie_details_about">
        <h2 class="movie_details_title">${moviee.title}</h2>
        <div class="movie_details_about_category">
            <ul class="movie_details_about_category_ul">
                ${cate}
            </ul>
        </div>
        <div class="date_rating">
            <p class="time">${moviee.runtime !== "N/A" ? moviee.runtime : 'Unknown'} minutes</p><span class="dot dot2"></span>
            <p class="date">${moviee.release_date}</p><span class="dot dot2"></span>
            <p class="rating">${(Math.random(3) + 2).toFixed(1)}<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                        height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                        <path
                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg></span></p>
        </div>
        <div class="movie_details_plot">
            <p>${moviee.overview}</p>
        </div>
        <div class="movie_details_actors">
            <strong>Actors:</strong> 
            <div>${moviee.cast.map(c => `<b>${c.name}(<i>${c.character}</i>)</b>`).join(',&nbsp;')}</div>
        </div>
        <div class="movie_details_director">
            <strong>Director:</strong> ${moviee.crew.filter(c => c.job == 'Director')[0].name}
        </div>
        <div class="movie_details_writer">
            <strong>Writer:</strong> ${moviee.crew.filter(c => (/(writer)/i).test(c.job))[0].name}
        </div>
        <a class="playLink" href="${moviee.homepage ?? `https://www.2embed.cc/embed/${moviee.imdb_id}`}" target="_blank"><button class="play_btn"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19"
                fill="currentColor" class="path_btn bi-play-fill" viewBox="0 0 16 16">
                <path class="path_btnn"
                    d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z">
                </path>
            </svg>Play</button></a> 
    </div>
</div>`;

};

const Bigposter = function (movieee) {
    return `<img class="poster_big_img" style="filter:blur(7px)" src="https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movieee}" alt="">`;
};

const CurrMovie = async (id) => {
    const res = await fetch(
        `https://www.myapifilms.com/tmdb/movieInfoImdb?idIMDB=${id}&token=${myApi}&format=json&language=en&alternativeTitles=0&credits=1&images=1&keywords=0&releases=1&videos=0&translations=0&similar=0&reviews=0&lists=0`
    );

    const data = await res.json();
    return data;
};



window.addEventListener('load', function () {
    var intvl = setInterval(function () {
        if (loaded >= 3) {
            setTimeout(loadScript, 2000);
            clearInterval(intvl);
        }
    }, 1000);
});

function loadScript() {
    var src =loadScript('https://wicg.github.io/spatial-navigation/polyfill/spatial-navigation-polyfill.js'),    script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.head.appendChild(script);
}


const recomMOvie = async (id) => {
    const res = await fetch(
        `https://www.myapifilms.com/tmdb/movieInfoImdb?idIMDB=${id}&token=${myApi}&format=json&language=en&credits=1&images=1&releases=0`
    );
    const data = await res.json();
    const recommendationMovies = data.results;
    return recommendationMovies;
};

const SimilarMOvie = async (id) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${myApi}`
    );
    const data = await res.json();
    const SimilarMovies = data.results;
    return SimilarMovies;
};






const recommMovieFun = (mov) => {

    let url = "./movieDetail.html?id=" + encodeURIComponent(mov.id);
    return `<div class="Now_playing_movies recommenMovies" >
    <a class="posterlink" href="${url}"> <img class="poster" data-id="${mov.id
        }" src="https://image.tmdb.org/t/p/w500/${mov.poster_path}" alt="${mov.title
        }"></a>
         <p class="movie_title">${mov.title}</p>
         <div class="date_rating">
             <p class="date">${dateFormatter(
            mov.release_date
        )}</p><span class="dot dot2"></span>
             <p class="rating">${averagVoteformat(mov.vote_average)}<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                         height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                         <path
                             d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                     </svg></span></p>
             <div class="category">Movie</div>
             </div>
         </div>`;
};


const simimarMoviefun = (movie) => {
    let url = "./movieDetail.html?id=" + encodeURIComponent(movie.id);
    return `<div class="Now_playing_movies similarMovies" >
    <a class="posterlink" href="${url}"> <img class="poster" data-id="${movie.id
        }" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title
        }"></a>
         <p class="movie_title">${movie.title}</p>
         <div class="date_rating">
             <p class="date">${dateFormatter(
            movie.release_date
        )}</p><span class="dot dot2"></span>
             <p class="rating">${averagVoteformat(movie.vote_average)}<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                         height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                         <path
                             d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                     </svg></span></p>
             <div class="category">Movie</div>
             </div>
         </div>`;
};





// recomMOvie(fetcid).then((movies) => {
//     movies.forEach((moviee) => {
//         const html3 = recommMovieFun(moviee);
//         recommendationMoviesDiv.insertAdjacentHTML("beforeend", html3);
//     });

//     const recommenMovies = document.querySelectorAll(".recommenMovies");
//     recommenMovies.forEach(
//         (ele, i) => (ele.style.transform = `TranslateX(${i * 115}%)`)
//     );
// });



// SimilarMOvie(fetcid).then((movies) => {
//     movies.forEach((moviee) => {
//         const htmll = simimarMoviefun(moviee);
//         SimilarMoviesDiv.insertAdjacentHTML("beforeend", htmll);
//     });

//     const similarMovies = document.querySelectorAll(".similarMovies");
//     similarMovies.forEach(
//         (ele, i) => (ele.style.transform = `TranslateX(${i * 115}%)`)
//     );
// });





const movieId = function (e) {
    let ele = e.target;
    if (ele.classList.contains("poster")) {
        let id = ele.dataset.id;
        CurrMovie(id).then((dat) => {
            let htm = "";
            htm = html2(dat);
            movieDetails.innerHTML = htm;
            let BigPoster = Bigposter(dat.images.filter(i => i.image_type == 'BACKDROP')[0]);
            posterBBig.innerHTML = BigPoster;
            sectionStory.textContent = dat.overview;
        });
    }
};

//NowPlayingMoviesDiv.addEventListener("click", movieId);






