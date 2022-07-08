// import createModal from './authApp';
import * as basicLightbox from 'basiclightbox';

const queue = (JSON.parse(localStorage.getItem('queue')))?.map(el => JSON.parse(el));
const watched = (JSON.parse(localStorage.getItem('watched')))?.map(el => JSON.parse(el));

document.addEventListener("DOMContentLoaded", event => {
  document.querySelectorAll('.header-library__btn').forEach(el => el.addEventListener("click", renderLibrary));
})


function renderLibrary(event) {
  const buttonEl = event.currentTarget;
  if (buttonEl.textContent.trim() === "Queue") {
    document.querySelector('.gallery').innerHTML = '';
    renderMoviesCardsMarkup((JSON.parse(localStorage.getItem('queue')))?.map(el => JSON.parse(el)));
  } else {
    document.querySelector('.gallery').innerHTML = '';
    renderMoviesCardsMarkup((JSON.parse(localStorage.getItem('watched')))?.map(el => JSON.parse(el)));
  }
  // console.log(event.currentTarget);
  
}

// console.log(queue);
// console.log(watched);


function renderMoviesCardsMarkup(array) {
  if (!array) {
    document.querySelector('.gallery').innerHTML = `<h2 class="message">Sorry! Here is no movies yet!
  Log in and choose them <a class="message__link" href="index.html">here</a> !</h2>`;
  } else {
    const markup = array?.map(({ id, poster_path, genres, original_title, release_date }) => {
      return `<article class="card" data-id="${id}">
                <img
                  class="card__image"
                  loading="lazy"
                  src="https://image.tmdb.org/t/p/w500${poster_path}"
                  alt="${original_title} movie poster"
                />
                <p class="card__title">${original_title}</p>
                <p class="card__genres">
                ${genres.map(el => " " + el.name)} | <span class="card__year">${release_date.split('-')[0]}</span>
                </p>
              </article>`}).join('');
    document.querySelector('.gallery').insertAdjacentHTML('beforeend', markup);
    document.querySelectorAll('.card').forEach(el => {
      el.addEventListener('click', event => {
        const movieId = Number(event.currentTarget.dataset.id);
        createModal(array.find(el => el.id === movieId));
      });
    });
  }
}

function createModal(obj) {
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
  } = obj;
  const instance = basicLightbox.create(
    `<div class="modal">
      <span class="modal__close">
      <svg class="modal-button-x" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
      </span>
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
          <button id="queueBtn" type="button" class="modal__button queue">
            Add to queue
          </button>
          <button id="removeFromWatchedBtn" type="button" class="modal__button watched">
            Remove from watched
          </button>
          <button id="removeFromQueueBtn" type="button" class="modal__button queue">
            Remove From queue
          </button>
        </div>
      </div>
    </div>`, {
    onShow: (instance) => {
        document.querySelector('body').style.overflow = "hidden";
        instance.element().querySelector('.modal__close').onclick = instance.close;
        document.addEventListener('keyup', closeModal);
        function closeModal(event) {
          if (event.key === 'Escape') {
            instance.close();
            document.removeEventListener('keyup', closeModal);
          }
        }
    },
    onClose: (instance) => {
      document.querySelector('body').style.overflow = "auto";
    },
    closable: true,
  })
  instance.show()
}

