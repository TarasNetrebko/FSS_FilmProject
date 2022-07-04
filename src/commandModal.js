const openModal = document.querySelector('#openModal');
const closeModal = document.querySelector('#closeModal');
const backdrop = document.querySelector('js-backdrop');

openModal.addEventListener('click', onOpenModal);

function onOpenModal() {
  document.body.classList.add('show-modal');
  console.log(onOpenModal);
}
