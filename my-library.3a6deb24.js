!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var c=new Error("Cannot find module '"+e+"'");throw c.code="MODULE_NOT_FOUND",c}).register=function(e,t){r[e]=t},t.parcelRequired7c6=a),a("iE7OH").register(JSON.parse('{"23zHU":"my-library.3a6deb24.js","dhpLJ":"blank-wanted-poster.db117cd4.jpg","5UbS1":"index.4e0bf312.css"}'));var c=a("hV5zi");a("dyT35");var o;function l(e){var t,n;"Queue"===e.currentTarget.textContent.trim()?(document.querySelector(".queue").classList.add("active"),document.querySelector(".watched").classList.remove("active"),document.querySelector(".gallery").innerHTML="",i(null===(t=JSON.parse(localStorage.getItem("queue")))||void 0===t?void 0:t.map((function(e){return JSON.parse(e)})))):(document.querySelector(".queue").classList.remove("active"),document.querySelector(".watched").classList.add("active"),document.querySelector(".gallery").innerHTML="",i(null===(n=JSON.parse(localStorage.getItem("watched")))||void 0===n?void 0:n.map((function(e){return JSON.parse(e)}))))}function i(t){if(t){var n=null==t?void 0:t.map((function(t){var n=t.id,r=t.poster_path,a=t.genres,c=t.original_title,l=t.release_date,i=null===r?e(o):"https://image.tmdb.org/t/p/w500"+r;return'<article class="card" data-id="'.concat(n,'">\n                <img\n                  class="card__image"\n                  loading="lazy"\n                  src="').concat(i,'"\n                  alt="').concat(c,' movie poster"\n                />\n                <p class="card__title">').concat(c,'</p>\n                <p class="card__genres">\n                ').concat(a.map((function(e){return" "+e.name})),' | <span class="card__year">').concat(l.split("-")[0],"</span>\n                </p>\n              </article>")})).join("");document.querySelector(".gallery").insertAdjacentHTML("beforeend",n),document.querySelectorAll(".card").forEach((function(e){e.addEventListener("click",(function(e){var n=Number(e.currentTarget.dataset.id),r={};r.data=t.find((function(e){return e.id===n})),(0,c.default)(r)}))}))}else document.querySelector(".gallery").innerHTML='<h2 class="message">Sorry! Here is no movies yet!\n  Log in and choose them <a class="message__link" href="index.html">here</a> !</h2>'}o=a("aNJCr").getBundleURL("23zHU")+a("iE7OH").resolve("dhpLJ"),document.addEventListener("DOMContentLoaded",(function(e){document.querySelectorAll(".header-library__btn").forEach((function(e){return e.addEventListener("click",l)})),document.querySelector(".queue").click()}))}();
//# sourceMappingURL=my-library.3a6deb24.js.map