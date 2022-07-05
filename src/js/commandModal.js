const openModal = document.querySelector('#openModal');
const closeModal = document.querySelector('#closeModal');
const backdrop = document.querySelector('.js-backdrop');

openModal.addEventListener('click', onOpenModal);
closeModal.addEventListener('click', onModalClose);
backdrop.addEventListener('click', onBackdropClick);

function onOpenModal() {
  window.addEventListener('keydown', onEscPress);
  document.body.classList.add('show-modal');
}
function onModalClose() {
  window.removeEventListener('keydown', onEscPress);
  document.body.classList.remove('show-modal');
}
function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onModalClose();
  }
}
function onEscPress(event) {
  if (event.code === 'Escape') {
    onModalClose();
  }
}
