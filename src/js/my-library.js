import createModal from './authApp';
import * as basicLightbox from 'basiclightbox';
import { userId } from './authApp';

document.addEventListener('DOMContentLoaded', event => {
  document
    .querySelectorAll('.header-library__btn')
    .forEach(el => el.addEventListener('click', renderLibrary));
  imitateClick();
});

function imitateClick() {
  if (!localStorage.getItem('current_page')) {
    document.querySelector('.queue').click();
  } else {
    const current_page = localStorage.getItem('current_page');
    document.querySelector('.' + current_page)?.click();
  }
}

function renderLibrary(event) {
  const buttonEl = event.currentTarget;
  if (buttonEl.textContent.trim() === 'Queue') {
    document.querySelector('.queue').classList.add('active');
    document.querySelector('.watched').classList.remove('active');
    localStorage.setItem('current_page', 'queue');
    renderMoviesCardsMarkup();
  } else {
    document.querySelector('.queue').classList.remove('active');
    document.querySelector('.watched').classList.add('active');
    // document.querySelector('.gallery').innerHTML = '';
    localStorage.setItem('current_page', 'watched');
    renderMoviesCardsMarkup();
  }
}

export default function renderMoviesCardsMarkup() {
  const current_page = localStorage.getItem('current_page');
  const array = JSON.parse(localStorage.getItem(current_page))?.map(el =>
    JSON.parse(el)
  );
  if (document.querySelector('.gallery.library')) {
    document.querySelector('.gallery.library').innerHTML = '';
  }

  if (!array) {
    document.querySelector(
      '.gallery.library'
    ).innerHTML = `<h2 class="message">Sorry! Here is no movies!
  You can choose them <a class="message__link" href="index.html">here</a> !</h2>`;
  } else {
    const markup = array
      ?.map(({ id, poster_path, genres, original_title, release_date }) => {
          const poster_url = poster_path === null ? no_img : 'https://image.tmdb.org/t/p/w500' + poster_path;
          const film_date = release_date ? release_date.split('-')[0] : "Release year unknown";
          const film_genres = genres.map(el => ' ' + el.name);
          if (!film_genres) {film_genres = "No information"};
          return `<article class="cardLib" data-id="${id}">
                <img
                  class="card__image"
                  loading="lazy"
                  src="https://image.tmdb.org/t/p/w500${poster_url}"
                  alt="${original_title} movie poster"
                />
                <p class="card__title">${original_title}</p>
                <p class="card__genres">
                ${film_genres} | <span class="card__year">${film_date
        }</span>
                </p>
              </article>`;
      })
      .join('');
    document
      .querySelector('.gallery.library')
      ?.insertAdjacentHTML('beforeend', markup);
    document.querySelectorAll('.cardLib').forEach(el => {
      el.addEventListener('click', event => {
        console.log(document.location.href);
        const movieId = Number(event.currentTarget.dataset.id);
        const filmObject = {};
        filmObject.data = array.find(el => el.id === movieId);
        // createModal(array.find(el => el.id === movieId));
        createModal(filmObject);
      });
    });
  }
}
