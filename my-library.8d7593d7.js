function e(e){return e&&e.__esModule?e.default:e}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},a={},n=r.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in a){var r=a[e];delete a[e];var n={id:e,exports:{}};return t[e]=n,r.call(n.exports,n,n.exports),n.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,r){a[e]=r},r.parcelRequired7c6=n),n("kyEFX").register(JSON.parse('{"7gmwE":"my-library.8d7593d7.js","6xTbM":"blank-wanted-poster.db117cd4.jpg","5UbS1":"index.6b03f870.css"}'));var l=n("exG1f");n("9B8F0");var o;function c(e){var r,t;"Queue"===e.currentTarget.textContent.trim()?(document.querySelector(".queue").classList.add("active"),document.querySelector(".watched").classList.remove("active"),document.querySelector(".gallery").innerHTML="",d(null===(r=JSON.parse(localStorage.getItem("queue")))||void 0===r?void 0:r.map((e=>JSON.parse(e))))):(document.querySelector(".queue").classList.remove("active"),document.querySelector(".watched").classList.add("active"),document.querySelector(".gallery").innerHTML="",d(null===(t=JSON.parse(localStorage.getItem("watched")))||void 0===t?void 0:t.map((e=>JSON.parse(e)))))}function d(r){if(r){const t=null==r?void 0:r.map((({id:r,poster_path:t,genres:a,original_title:n,release_date:l})=>`<article class="card" data-id="${r}">\n                <img\n                  class="card__image"\n                  loading="lazy"\n                  src="${null===t?e(o):"https://image.tmdb.org/t/p/w500"+t}"\n                  alt="${n} movie poster"\n                />\n                <p class="card__title">${n}</p>\n                <p class="card__genres">\n                ${a.map((e=>" "+e.name))} | <span class="card__year">${l.split("-")[0]}</span>\n                </p>\n              </article>`)).join("");document.querySelector(".gallery").insertAdjacentHTML("beforeend",t),document.querySelectorAll(".card").forEach((e=>{e.addEventListener("click",(e=>{const t=Number(e.currentTarget.dataset.id),a={};a.data=r.find((e=>e.id===t)),(0,l.default)(a)}))}))}else document.querySelector(".gallery").innerHTML='<h2 class="message">Sorry! Here is no movies yet!\n  Log in and choose them <a class="message__link" href="index.html">here</a> !</h2>'}o=new URL(n("kyEFX").resolve("6xTbM"),import.meta.url).toString(),document.addEventListener("DOMContentLoaded",(e=>{document.querySelectorAll(".header-library__btn").forEach((e=>e.addEventListener("click",c))),document.querySelector(".queue").click()}));
//# sourceMappingURL=my-library.8d7593d7.js.map
