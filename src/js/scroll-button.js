const scrollBtn = document.querySelector('#scroll-top');

function eventHandler() {
  window.addEventListener('scroll', scrollEvent);
  scrollBtn.addEventListener('click', scrollToTop);
}

export default function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function scrollEvent() {
  if (window.pageYOffset > 300) {
    scrollBtn.classList.add('scroll-visible');
  } else {
    scrollBtn.classList.remove('scroll-visible');
  }
}

eventHandler();
