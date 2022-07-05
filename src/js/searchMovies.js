import fetchFromBackend from './fetchAPI';
import renderMoviesCardsMarkup from './fetchMovies';

const API_KEY = '641afe219016a353adafbc0b4f44c0fe';

const $refs = {
  form: document.querySelector('.header-form'),
  gallery: document.querySelector('.gallery'),
  message: document.querySelector('#message'),
};

// const $form = document.querySelector('.header-form');
// const $gallery = document.querySelector('.gallery');
// const $message = document.querySelector('#message');

const eventHandlers = () => {
  window.addEventListener('DOMContentLoaded', init);
  $refs.form.addEventListener('submit', onShowMovies);
};

$refs.form.addEventListener('submit', onShowMovies);

function init(response) {
  loadMovies(response);
}

async function onShowMovies(event) {
  event.preventDefault();

  const query = $refs.form.searchMovie.value;

  if (query === '') {
    $refs.message.classList.remove('visually-hidden');
  } else {
    $refs.message.classList.add('visually-hidden');

    const fetchMovies = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=1`;
    fetchFromBackend(fetchMovies, loadMovies);
  }

  $refs.form.reset();
}

function loadMovies(response) {
  if (response.data.results.length === 0) {
    $refs.message.classList.remove('visually-hidden');
  } else {
    $refs.message.classList.add('visually-hidden');

    // renderMovieCard(response);
    $refs.gallery.innerText = '';
    renderMoviesCardsMarkup(response);
  }
}

// function renderMovieCard(obj) {
//   const result = obj.data.results;
//   const markup = result
//     .map(({ id, poster_path, genre_ids, original_title, release_date }) => {
//       return `<article class="card" data-id="${id}">
//                 <img class="card__image" loading="lazy"
//                 src="https://image.tmdb.org/t/p/w500${poster_path}"
//                 alt="${original_title} movie poster"/>

//                 <p class="card__title">${original_title}</p>
//                 <p class="card__genres">${genre_ids} |
//                 <span class="card__year">${release_date.split('-')[0]}</span>
//                 </p>
//             </article>`;
//     })
//     .join('');

//   $refs.gallery.innerText = '';
//   $refs.gallery.insertAdjacentHTML('beforeend', markup);
// }

// eventHandlers();

eventHandlers();
