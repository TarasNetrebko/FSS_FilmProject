import fetchFromBackend from './fetchAPI';
import createModal from './authApp';

const API_KEY = '641afe219016a353adafbc0b4f44c0fe';
let GenreArray;

function GenreString(GenreId) {
  if (GenreArray) {
    let GenreList = '';
    let countList = 0;
    for (const Genre of GenreArray) {
      if (GenreId.includes(Genre.id)) {
        if (GenreList.length > 0) {
          GenreList = GenreList + ', ' + Genre.name;
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
}

async function getGenreById(obj) {
  GenreArray = await obj.data.genres;
}

function getGenreList() {
  const URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  fetchFromBackend(URL, getGenreById);
}

function getPopularMovies() {
  const URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
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
  await getGenreList();
  await getPopularMovies();
}

function renderMoviesCardsMarkup(obj) {
  const array = obj.data.results;
  const markup = array
    .map(({ id, poster_path, genre_ids, original_title, release_date }) => {
      return `<article class="card" data-id="${id}">
                        <img
                          class="card__image"
                          loading="lazy"
                          src="https://image.tmdb.org/t/p/w500${poster_path}"
                          alt="${original_title} movie poster"
                        />
                      <p class="card__title">${original_title}</p>
                      <p class="card__genres">
                        ${GenreString(genre_ids)} | <span class="card__year">${
        release_date.split('-')[0]
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
}

startfilm();

