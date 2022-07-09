import createModal from './authApp';
import * as basicLightbox from 'basiclightbox';

// const queue = (JSON.parse(localStorage.getItem('queue')))?.map(el => JSON.parse(el));
// const watched = (JSON.parse(localStorage.getItem('watched')))?.map(el => JSON.parse(el));

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
}

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
        const filmObject = {};
        filmObject.data = array.find(el => el.id === movieId);
        // createModal(array.find(el => el.id === movieId));
        createModal(filmObject);
      });
    });
  }
}