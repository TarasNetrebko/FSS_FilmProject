import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, update } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
const signInBtn = document.querySelector("#signInBtn");
const logInBtn = document.querySelector("#logInBtn");
const logOutBtn = document.querySelector("#logOutBtn")

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
        const username = document.querySelector("#username").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
            const user = userCredential.user;
            set(ref(database, 'users/' + user.uid), {
                username: username,
                email: email
            })
            alert('User created!');
    
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert('smth wrong!');
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
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;        
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
            const user = userCredential.user;
            const currDate = new Date();
        update(ref(database, 'users/' + user.uid), {
            last_login: currDate,
        })
            alert('user loged in!');
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        });
    }
    // const user = auth.currentUser;
        onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log(user.displayName);
        } else {
            // User is signed out
        }
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

function logOut() {
    signOut(auth).then(() => {
  // Sign-out successful.
    }).catch((error) => {
  // An error happened.
        alert('User still there or smth wrong!');
    });
}
