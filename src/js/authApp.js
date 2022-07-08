import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, update, get, onValue, child, remove } from "firebase/database";
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
let userId;
let watchedMovies;
let moviesInQueue;
const signInBtn = document.querySelector("#signInBtn");
const logInBtn = document.querySelector("#logInBtn");
const logOutBtn = document.querySelector("#logOutBtn");
const displayEmail = document.querySelector("#displayEmail");

signInBtn.addEventListener("click", signInModal);
logInBtn.addEventListener("click", logInModal);
logOutBtn.addEventListener("click", logOut);

onAuthStateChanged(auth, (user) => {
  if (user) {    
    userId = user.uid;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}/watchedMovies`)).then(async (snapshot) => {
    if (snapshot.exists()) {
      watchedMovies = await snapshot.val();
      localStorage.setItem('watched', JSON.stringify(Object.values(watchedMovies)));

    } else {
      console.log("No data available");
      // localStorage.removeItem('watched');
    }
  }).catch((error) => {
    console.error(error);
  });
    get(child(dbRef, `users/${userId}/queueOfMovies`)).then(async (snapshot) => {
    if (snapshot.exists()) {
      moviesInQueue = await snapshot.val();
      // Experiment
      localStorage.setItem('queue', JSON.stringify(Object.values(moviesInQueue)));
      // console.log(Object.values(moviesInQueue));
      // End
    } else {
      console.log("No data available");
      localStorage.removeItem('queue');
    }
  }).catch((error) => {
    console.error(error);
  });
  }
});

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
      <span class="modal__close">
      <svg class="modal-button-x" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
      </span>
      <img
        class="modal__img"
        src="https://image.tmdb.org/t/p/w500/${poster_path}"
        alt="${original_title} movie poster"
        class="modal__img"
      />
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
          <button id="removeFromWatchedBtn" type="button" class="modal__button watched">
            Remove from watched
          </button>
          <button id="removeFromQueueBtn" type="button" class="modal__button queue">
            Remove From queue
          </button>
        </div>
      </div>
    </div>`, {
      onShow: (instance) => {
        document.querySelector('body').style.overflow = "hidden";
      },
      onClose: (instance) => {
        document.querySelector('body').style.overflow = "auto";
      },
	closable: true,
  })
  
  instance.show()
  const watchedBtn = document.querySelector("#watchedBtn");
  const queueBtn = document.querySelector("#queueBtn");
  const removeFromWatchedBtn = document.querySelector("#removeFromWatchedBtn");
  const removeFromQueueBtn = document.querySelector("#removeFromQueueBtn");
  removeFromWatchedBtn.addEventListener("click", removeFromWatched);
  removeFromQueueBtn.addEventListener("click", removeFromQueue);
  watchedBtn.addEventListener("click", addFilmToWatched);
  queueBtn.addEventListener("click", addFilmToQueue);
  get(child(ref(getDatabase()), `users/${userId}/watchedMovies/${id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        watchedBtn.classList.add("visually-hidden");
        removeFromWatchedBtn.classList.remove("visually-hidden");
      } else {
        watchedBtn.classList.remove("visually-hidden");
        removeFromWatchedBtn.classList.add("visually-hidden");
      }
    }).catch((error) => {
      console.error(error);
    });
  get(child(ref(getDatabase()), `users/${userId}/queueOfMovies/${id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        queueBtn.classList.add("visually-hidden");
        removeFromQueueBtn.classList.remove("visually-hidden");
      } else {
        queueBtn.classList.remove("visually-hidden");
        removeFromQueueBtn.classList.add("visually-hidden");
      }
    }).catch((error) => {
      console.error(error);
    });
  function addFilmToWatched() {
    set(ref(database, `users/${userId}/watchedMovies/${id}`), JSON.stringify(data.data));
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}/watchedMovies`)).then((snapshot) => {
      if (snapshot.exists()) {
        watchedMovies = snapshot.val();
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    window.location.reload();
  }
  function addFilmToQueue() {
    set(ref(database, `users/${userId}/queueOfMovies/${id}`), JSON.stringify(data.data));
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}/queueOfMovies`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        moviesInQueue = snapshot.val();
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    window.location.reload();
  }
  function removeFromWatched() {
    remove(ref(database, `users/${userId}/watchedMovies/${id}`))
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}/watchedMovies`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        watchedMovies = snapshot.val();
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    window.location.reload();
  }
  function removeFromQueue() {
    remove(ref(database, `users/${userId}/queueOfMovies/${id}`))
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}/queueOfMovies`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        moviesInQueue = snapshot.val();
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    window.location.reload();
  }
  document.querySelector('.modal__close').addEventListener("click", closeModal)
  document.addEventListener('keyup', closeModal);
  function closeModal(event) {
    if (event.key === 'Escape' || event.currentTarget.classList.contains("modal__close")) {
      instance.closable
      document.querySelector('body').style.overflow = "auto";
      instance.close();
      document.removeEventListener('keyup', closeModal);
    }
  }
}
function signInModal() {   
    
    const instance = basicLightbox.create(`
    <div class="modal-body">    
        <p class="modal-title">Sign In</p>        
        <form action="" id="signInForm"> 
            <div class="form-field">    
                <label for="username" class="input-text">Name</label>
                <div class="input-wrap">            
                    <input id="username" type="text" name="username" placeholder="Your name">
                </div>
            </div>
            <div class="form-field">
                <label for="email" class="input-text">Email</label>
                <div class="input-wrap">
                    <input id="email" type="email" name="email" placeholder="Your email">
                </div>
            </div>
            <div class="form-field">
                <label for="password" class="input-text">Password</label>
                <div class="input-wrap">
                    <input id="password" type="password" name="password" placeholder="Your password">
                </div>
            </div>
             <div class="form-button">
            <button id="submitSignInBtn" type="submit">Confirm</button>
            </div>
        </form>
        <button type="button" class="modal-button">
                <svg class="modal-button-x" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
        </button>
    </div>
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
              online: true,
            })
            signInForm.reset();
            displayEmail.innerHTML = `${auth.currentUser.email}`;
            logInBtn.classList.add("visually-hidden");
            signInBtn.classList.add("visually-hidden");
            logOutBtn.classList.remove("visually-hidden");
            window.location.reload();
            // instance.close()
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
    <div class="modal-body">    
        <p class="modal-title">log In</p>        
        <form action="" id="logInForm">             
            <div class="form-field">
                <label for="email" class="input-text">Email</label>
                <div class="input-wrap">
                    <input id="email" type="email" name="email" placeholder="Your email">
                </div>
            </div>
            <div class="form-field">
                <label for="password" class="input-text">Password</label>
                <div class="input-wrap">
                    <input id="password" type="password" name="password" placeholder="Your password">
                </div>
            </div>
             <div class="form-button">
            <button id="submitLogInBtn" type="submit">Confirm</button>
            </div>
        </form>
        <button type="button" class="modal-button">
                <svg class="modal-button-x" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
        </button>
    </div>
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
                    window.location.reload();
                    // instance.close();
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                      const errorMessage = error.message;
                      alert("wrong password");
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
    // Sign-out successful.
    logInBtn.classList.remove("visually-hidden");
    signInBtn.classList.remove("visually-hidden");
    displayEmail.innerHTML = "";
    logOutBtn.classList.add("visually-hidden");
    document.querySelector("#nav-library").classList.add("visually-hidden");
  }).catch((error) => {
  // An error happened.
  });
    localStorage.removeItem('queue');
    localStorage.removeItem('watched');
}
window.addEventListener("DOMContentLoaded", () => {
  get(child(ref(getDatabase()), `users/${userId}/online`)).then((snapshot) => {
    displayEmail.innerHTML = `${auth.currentUser.email}`;
    logInBtn.classList.add("visually-hidden");
    signInBtn.classList.add("visually-hidden");
    logOutBtn.classList.remove("visually-hidden");
    document.querySelector("#nav-library").classList.remove("visually-hidden");
  }).catch((error) => {
    console.error(error);
  });
})

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


// console.log(auth);
// console.log(moviesInQueue);
