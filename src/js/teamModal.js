const openModal = document.querySelector('#openModal');
const closeModal = document.querySelector('#closeModal');
const backdrop = document.querySelector('.js-backdrop');
const modalTeam = document.querySelector(".modal-team");

openModal.addEventListener('click', onOpenModal);
closeModal.addEventListener('click', onModalClose);
backdrop.addEventListener('click', onBackdropClick);

function onOpenModal() {
  modalTeam.style.display = "block";
  window.addEventListener('keydown', onEscPress);
  document.body.classList.add('show-modal');
  document.getElementsByTagName('body')[0].style.overflow = 'hidden';
}
function onModalClose() {
  modalTeam.style.display = "none";
  window.removeEventListener('keydown', onEscPress);
  document.body.classList.remove('show-modal');
  document.getElementsByTagName('body')[0].style.overflow = 'scroll';
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
