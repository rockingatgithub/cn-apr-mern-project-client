import React, { useState } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { fetchByID } from "./Firebase-db";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

    apiKey: "AIzaSyD6YA36wCzmTIsybDPdPR58dU8IYfzxAy8",
    authDomain: "react-auth-12d7d.firebaseapp.com",
    projectId: "react-auth-12d7d",
    storageBucket: "react-auth-12d7d.appspot.com",
    messagingSenderId: "541139928238",
    appId: "1:541139928238:web:d3608587236a9bd075593f",
    measurementId: "G-RZ6S7JC6KC"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

const Auth = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState({})

    const signupHandler = () => {

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    const signinHandler = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUser(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });

    }

    console.log("user", user)

    return <>

        {user.email ? <div>
            <h2>Profile</h2>
            <span>Email:- {user.email}</span>
        </div> :
            <div>
                <h1>
                    Firebase Auth
                </h1>
                <input type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                {props.type === "signup" ? <button onClick={signupHandler} > Signup </button> :
                    <button onClick={signinHandler} > Signin </button>
                }

            </div>

        }
    </>


}

export default Auth