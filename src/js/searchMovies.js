import fetchFromBackend from './fetchAPI';
import renderMoviesCardsMarkup from './fetchMovies';

const API_KEY = '641afe219016a353adafbc0b4f44c0fe';

const $refs = {
  form: document.querySelector('.header-form'),
  gallery: document.querySelector('.gallery'),
  errorMessage: document.querySelector('#message'),
};

$refs.form.addEventListener('submit', onShowMovies);

async function onShowMovies(event) {
  event.preventDefault();

  const query = $refs.form.searchMovie.value;

  if (query === '') {
    $refs.errorMessage.classList.remove('visually-hidden');
  } else {
    $refs.errorMessage.classList.add('visually-hidden');

    const fetchMovies = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=1`;
    fetchFromBackend(fetchMovies, loadMovies);
  }

  $refs.form.reset();
}

function loadMovies(response) {
  if (response.data.results.length === 0) {
    $refs.errorMessage.classList.remove('visually-hidden');
  } else {
    $refs.errorMessage.classList.add('visually-hidden');

    $refs.gallery.innerText = '';
    renderMoviesCardsMarkup(response);
  }
}
