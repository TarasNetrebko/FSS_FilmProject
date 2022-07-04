import axios from 'axios';
import * as basicLightbox from 'basiclightbox';


const API_KEY = '641afe219016a353adafbc0b4f44c0fe';
let GenreArray;

function fetchFromBackend(url, callback) {
  axios
    .get(url)
    .then(async function (response) {
      // handle success
      callback(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}

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

function getGenreById(obj) {
  GenreArray = obj.data.genres;
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
  document.querySelector('.main').insertAdjacentHTML('beforeend', markup);
  document.querySelectorAll('.card').forEach(el => {
    el.addEventListener('click', event => {
      const movieId = event.currentTarget.dataset.id;
      getMovieInfo(movieId);
    });
  });
}

startfilm();

let filmInfo;

function createModal(data) {
  filmInfo = data.data;
  const {
    poster_path,
    title,
    genres,
    id,
    original_title,
    overview,
    popularity,
    release_date,
    vote_average,
    vote_count,
  } = data.data;
  const instance = basicLightbox.create(
    `<div class="modal">
      <span class="modal__close">+</span>
      <img
        class="modal__img"
        src="https://image.tmdb.org/t/p/w500/${poster_path}"
        alt="${original_title} movie poster"
        class="modal__img"
      />
      <div class="modal__description">
        <h2 class="modal__title">${original_title}</h2>
        <table class="modal__info">
          <tbody>
            <tr>
              <td>Vote / Votes</td>
              <td><span class="modal__rating">${vote_average}</span> / ${vote_count}</td>
            </tr>
            <tr>
              <td>Popularity</td>
              <td>${popularity}</td>
            </tr>
            <tr>
              <td>Original Title</td>
              <td class="modal__original-title">${original_title}</td>
            </tr>
            <tr>
              <td>Genre</td>
              <td class="modal__genre">${genres
                .map(el => `${el.name}`)
                .join(', ')}</td>
            </tr>
          </tbody>
        </table>
        <h3 class="modal__plot-title">About</h3>
        <p class="modal__plot">${overview}</p>
        <div class="modal__button-wrapper">
          <button id="watchedBtn" type="button" class="modal__button watched">
            Add to watched
          </button>
          <button id="queueBtn" type="button" class="modal__button watched">
            Add to queue
          </button>
        </div>
      </div>
    </div>
`,
    {
      onShow: instance => {
        instance.element().querySelector('.modal__close').onclick =
          instance.close;
        document.addEventListener('keyup', closeModal);
        function closeModal(event) {
          if (event.key === 'Escape') {
            instance.close();
            document.removeEventListener('keyup', closeModal);
          }
        }
      },
    }
  );
    
  instance.show();
}

// ------------------
// QUEUE & WATCHED
// ------------------
