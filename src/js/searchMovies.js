import fetchFromBackend from './fetchAPI';
import renderMoviesCardsMarkup from './fetchMovies';
import Paginator from "./Paginator";
const API_KEY = '641afe219016a353adafbc0b4f44c0fe';

const $refs = {
  form: document.querySelector('.header-form'),
  gallery: document.querySelector('.gallery'),
  errorMessage: document.querySelector('#message'),
};

function loadMovies(response) {
  if (response.data.results.length === 0) {
    $refs.errorMessage.classList.remove('visually-hidden');
  } else {
    $refs.errorMessage.classList.add('visually-hidden');

    $refs.gallery.innerText = '';
    renderMoviesCardsMarkup(response);
  }
}

// $refs.form.addEventListener('submit', onShowMovies);

export function onShowMovies(query) {

  if (query === '') {
    $refs.errorMessage.classList.remove('visually-hidden');
  } else {
    $refs.errorMessage.classList.add('visually-hidden');

    const fetchMovies = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${Paginator.getCurrentPage()}`;
    fetchFromBackend(fetchMovies, loadMovies);
  }

  $refs.form.reset();
}