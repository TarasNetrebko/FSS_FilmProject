let preloader = document.querySelector(".preloader");
window.addEventListener('load', () => {
    preloader.classList.add("hidden");
    setTimeout(() => {
        preloader.remove();
    }, 600);
})