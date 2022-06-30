import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import * as basicLightbox from 'basiclightbox';
const authBtn = document.querySelector("#authBtn");

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

authBtn.addEventListener("click", authModal);

function authModal() {
    
    
        const instance = basicLightbox.create(`
    <form action="">
    <input id="username" type="text" name="username" placeholder="Your ename">
      <input id="email" type="email" name="email" placeholder="Your email">
      <input id="password" type="password" name="password" placeholder="Your password">
      <button id="submitBtn" type="submit">Confirm</button>
    </form>
`)      
    instance.show()
    const submitBtn = document.querySelector("#submitBtn");
    submitBtn.addEventListener("click", createNewUser);

    function createNewUser(e) {
        const username = document.querySelector("#username").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
            const user = userCredential.user;
            alert(`User: ${username} created!`);
    
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert('smth wrong!');
        });
}
    document.querySelector("body").addEventListener("keydown", closeModal);
        function closeModal(e) {
            if (e.key === "Escape") {
                instance.close()
                gallery.removeEventListener("keydown", closeModal);
                gallery.removeEventListener("click", authModal);
        }
    }
}   
    
