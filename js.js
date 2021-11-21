const Api_key = 'api_key=5fa6f0117dcc8018fa9fd91f5bf07432';
const BASE_URL = 'https://api.themoviedb.org/3';
const API = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+Api_key;
const IMG = 
"https://image.tmdb.org/t/p/w1280";
const search_Api =
'https://api.themoviedb.org/3/search/movie?api_key=5fa6f0117dcc8018fa9fd91f5bf07432&query="';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const icon = document.querySelector(".icon");
icon.onclick = function () {
    form.classList.toggle("active");
}

getMovies(API);

    async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
}

function showMovies(movies){
    main.innerHTML = "";
    movies.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
        <img src = "${IMG + poster_path}" alt = "${title}">
        <div class = "movie-info">
        <h3>${title}</h3>

        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div  class="overview">
        <h3>Overview</h3>
        ${overview}
        </div>
        `
        main.appendChild(movieEl);
    });
}

function getClassByRate(vote){
    if(vote>=8){
        return "green"
    }else if(vote>=5){
        return "orange"
    }else{
        return "red"
    }
}
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const searchItem = search.value;
    if(searchItem && searchItem !== ''){
        getMovies(search_Api+ searchItem)
        search.value
    }else{
        window.location.reload()
    }

})

//yangui
