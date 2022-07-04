import * as basicLightbox from 'basiclightbox';

export default function createModal(data) {
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
      <!--<div class="modal__img" style='background-image: url("https://image.tmdb.org/t/p/w500/${poster_path}");'>-->
      <img
        class="modal__img"
        src="https://image.tmdb.org/t/p/w500/${poster_path}"
        alt="${original_title} movie poster"
        class="modal__img"
      />
      <!--</div>-->
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
          <button type="button" class="modal__button watched">
            Add to watched
          </button>
          <button type="button" class="modal__button queue">
            Add to queue
          </button>
        </div>
      </div>
    </div>`,
    {
      onShow: instance => {
        instance.element().querySelector('.modal__close').onclick = instance.close;
        document.addEventListener('keyup', closeModal);
        function closeModal(event) {
          if (event.key === 'Escape') {
            instance.close();
            document.removeEventListener('keyup', closeModal);
          }
        }
        document.querySelector('body').style.overflow = "hidden";
      },
      onClose: instance => {
        document.querySelector('body').style.overflow = "auto";
      }
    
    }
  );

  instance.show();
}
