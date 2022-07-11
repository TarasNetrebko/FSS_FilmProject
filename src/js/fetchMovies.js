import fetchFromBackend from './fetchAPI';
import createModal from './authApp';
import Paginator from "./Paginator";
import { onShowMovies } from './searchMovies';
import no_img from '../images/blank-wanted-poster.jpg';
import { save, load } from "./storage"

const API_KEY = '641afe219016a353adafbc0b4f44c0fe';
let GenreArray;

function GenreString(GenreId) {
  if (GenreId.length === 0 ){
    return "No information";
  }  
  if (GenreArray) {
    let GenreList = '';
    let countList = 0;
    for (const Genre of GenreArray) {
      if (GenreId.includes(Genre.id)) {
        if (GenreList.length > 0) {
          if (countList < 2){
            GenreList = GenreList + ', ' + Genre.name;
          }else{
            GenreList = GenreList + ', Other';
          }
        } else {
          GenreList = Genre.name;
        }
        countList += 1;
        if (countList === 3) {
          return GenreList;
        }
      }
    }
    return GenreList;
  }
  return "no genre";
}

async function getGenreById(obj) {
  GenreArray = await obj.data.genres;
  save("StorageGenreArray",GenreArray);
}

function getGenreList() {
  const URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  fetchFromBackend(URL, getGenreById);
}

function getPopularMovies() {
  const page = Paginator.getCurrentPage();
  const pageQueryStr = `&page=${page}`
  const URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}` + pageQueryStr;
  fetchFromBackend(URL, renderMoviesCardsMarkup);
}

function searchMoviesByWord(page) {
  const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&query=${query}`;
}

function getMovieInfo(id) {
  const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
  fetchFromBackend(URL, createModal);
}

async function startfilm() {
  GenreArray=load("StorageGenreArray");
  if (!GenreArray){
    await getGenreList();
  }

  const params = new URLSearchParams(window.location.search);
  const searchQuery = params.get('searchMovie');

  if (searchQuery && searchQuery.length) {
    await onShowMovies(searchQuery);
  } else {
    await getPopularMovies();
  }

}

export default function renderMoviesCardsMarkup(obj) {
  const array = obj.data.results;

  const markup = array
    .map(({ id, poster_path, genre_ids, original_title, release_date }) => {
      const poster_url = poster_path === null ? no_img : 'https://image.tmdb.org/t/p/w500' + poster_path;
      const film_date = release_date.split('-')[0].length === 4 ? release_date.split('-')[0] : "Release year unknown";
      return `<article class="card" data-id="${id}">
                        <img
                          class="card__image"
                          loading="lazy"
                          src="${poster_url}"
                          alt="${original_title} movie poster"
                        />
                      <p class="card__title">${original_title}</p>
                      <p class="card__genres">
                        ${GenreString(genre_ids)} | <span class="card__year">${film_date
        }</span>
                      </p>
                    </article>`;
    })
    .join('');
  document.querySelector('.gallery').insertAdjacentHTML('beforeend', markup);
  document.querySelectorAll('.card').forEach(el => {
    el.addEventListener('click', event => {
      const movieId = event.currentTarget.dataset.id;
      getMovieInfo(movieId);
    });
  });

  const paginator = new Paginator(Paginator.getCurrentPage(), 20, obj.data.total_results);
  paginator.render();
}

startfilm();

