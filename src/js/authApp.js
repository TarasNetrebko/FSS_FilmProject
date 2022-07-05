import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, update } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, getAdditionalUserInfo } from "firebase/auth";
import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import Notiflix, { Notify } from 'notiflix';

const firebaseConfig = {
  apiKey: "AIzaSyB4RYBFTyES81mms8M7OWMBEbyDzsl2aDQ",
  authDomain: "auth-app-16518.firebaseapp.com",
  databaseURL: "https://auth-app-16518-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "auth-app-16518",
  storageBucket: "auth-app-16518.appspot.com",
  messagingSenderId: "735705088230",
  appId: "1:735705088230:web:5f28a2933df786d005bb27"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

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
          <button id="watchedBtn" type="button" class="modal__button watched">
            Add to watched
          </button>
          <button id="queueBtn" type="button" class="modal__button queue">
            Add to queue
          </button>
        </div>
      </div>
    </div>`)  
  instance.show()
  const watchedBtn = document.querySelector("#watchedBtn");
    //     // const queueBtn = document.querySelector("#queueBtn");
        watchedBtn.addEventListener("click", addFilmToWatched);

    //     // queueBtn.addEventListener("click", addFilmToQueue);
  function addFilmToWatched() {     
            console.log(data.data);
            // const userId = auth.currentUser.uid;
            // set(ref(database, `users/${userId}/watchedMovies/${id}`), data.data);
        }
        instance.element().querySelector('.modal__close').onclick = instance.close;
        document.addEventListener('keyup', closeModal);
        function closeModal(event) {
          if (event.key === 'Escape') {
            instance.close();
            document.removeEventListener('keyup', closeModal);
          }
        }
        // document.querySelector('body').style.overflow = "hidden";
        // document.querySelector('body').style.overflow = "auto";
}
  
const signInBtn = document.querySelector("#signInBtn");
const logInBtn = document.querySelector("#logInBtn");
const logOutBtn = document.querySelector("#logOutBtn");
const displayEmail = document.querySelector("#displayEmail");

signInBtn.addEventListener("click", signInModal);
logInBtn.addEventListener("click", logInModal);
logOutBtn.addEventListener("click", logOut);


function signInModal() {   
    
        const instance = basicLightbox.create(`
    <form action="" id="signInForm">
    <input id="username" type="text" name="username" placeholder="Your name">
      <input id="email" type="email" name="email" placeholder="Your email">
      <input id="password" type="password" name="password" placeholder="Your password">
      <button id="submitSignInBtn" type="submit">Confirm</button>
    </form>
`)      
    instance.show()
    const signInForm = document.querySelector("#signInForm");
    signInForm.addEventListener("submit", createNewUser);

    function createNewUser(e) {
        e.preventDefault();
        const username = document.querySelector("#username").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
            const user = userCredential.user;
            set(ref(database, 'users/' + user.uid), {
                email: email,
                displayName: username,
            })
            signInForm.reset();
            displayEmail.innerHTML = `${auth.currentUser.email}`;
            logInBtn.classList.add("visually-hidden");
            signInBtn.classList.add("visually-hidden");
            logOutBtn.classList.remove("visually-hidden");
            instance.close()
            Notiflix.Notify.success(`User: ${auth.currentUser.email} created!`);
    
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Notiflix.Notify.failure('smth wrong!');
        });
        
}
    document.querySelector("body").addEventListener("keydown", closeModal);
        function closeModal(e) {
            if (e.key === "Escape" || e === "submit") {
                instance.close()
                gallery.removeEventListener("keydown", closeModal);
                gallery.removeEventListener("click", signInModal);
        }
    }
}

function logInModal() {
    
    
    const instance = basicLightbox.create(`
    <form action="" id="logInForm">
      <input id="email" type="email" name="email" placeholder="Your email">
      <input id="password" type="password" name="password" placeholder="Your password">
      <button id="submitLogInBtn" type="submit">Confirm</button>
    </form>
`)
  instance.show()
    const logInForm = document.querySelector("#logInForm");
    logInForm.addEventListener("submit", authUser);

    function authUser(e) {
        e.preventDefault();
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;        
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    const currDate = new Date();
                    // set(ref(database, 'users/' + user.uid), {
                    //     online: true,
                    // })
                    update(ref(database, 'users/' + user.uid), {
                        last_login: currDate,
                        online: true,
                    })
                    displayEmail.innerHTML = `${auth.currentUser.email}`;
                    logInBtn.classList.add("visually-hidden");
                    signInBtn.classList.add("visually-hidden");
                    logOutBtn.classList.remove("visually-hidden");
                    instance.close();
                    Notiflix.Notify.success(`User: ${auth.currentUser.email} loged in!`)
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                    });
            
        document.querySelector("body").addEventListener("keydown", closeModal);
        function closeModal(e) {
            if (e.key === "Escape") {
                instance.close()
                gallery.removeEventListener("keydown", closeModal);
                gallery.removeEventListener("click", signInModal);
            }
        }
    }
}

function logOut() {    
            update(ref(database, 'users/' + auth.currentUser.uid), {
                online: false,
            });
            signOut(auth).then(() => {
                logInBtn.classList.remove("visually-hidden");
                signInBtn.classList.remove("visually-hidden");
                displayEmail.innerHTML = "";
                logOutBtn.classList.add("visually-hidden"); 
            // Sign-out successful.
            }).catch((error) => {
            // An error happened.
            });
    Notiflix.Notify.info(`User: ${auth.currentUser.email} loged out!`);
}

// ------------------
// QUEUE & WATCHED
// ------------------
// const queueBtn = document.querySelector("#queueBtn");
// const watchedBtn = document.querySelector("#watchedBtn");
// queueBtn.addEventListener("click", addFilmToQueue);
// watchedBtn.addEventListener("click", addFilmToWatched);

// function addFilmToQueue() {
//     console.log(filmInfo.id);
// }
