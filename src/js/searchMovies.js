import fetchFromBackend from './fetchAPI';

const API_KEY = '641afe219016a353adafbc0b4f44c0fe';

const $form = document.querySelector('.header-form');

// const eventHandlers = () => {
//   window.addEventListener('DOMContentLoaded', init);
//   $form.addEventListener('submit', onShowMovies);
// };

$form.addEventListener('submit', onShowMovies);

// function init(response) {
//   loadMovies(response);
// }

async function onShowMovies(event) {
  event.preventDefault();

  const query = $form.searchMovie.value;
  console.log(query);

  const fetchMovies = `https://developers.themoviedb.org/3/search/search-movies?${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;
  fetchFromBackend(fetchMovies, loadMovies);

  console.log(fetchMovies);

  $form.reset();
}

function loadMovies(response) {
  console.log(response);
  renderMovieCard(response);
}

function renderMovieCard(obj) {
  console.log(obj.data.results);
}

// eventHandlers();
