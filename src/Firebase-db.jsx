import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; 


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
const db = getFirestore(app);

export const addUser = async (name, email, password) => {
  try {
      const docRef = await addDoc(collection(db, "User"), {
        name,
        email,
        password
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

export const fetchByID =async  () => {
  const usersRef = collection(db, "User");
  const q = query(usersRef);
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot)
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}




const FireBaseDB = () => {

    const addUser = async () => {
        try {
            const docRef = await addDoc(collection(db, "User"), {
              name: "Ada",
              phone: "Lovelace",
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    return <div>
        <button onClick={addUser} > Add data  </button>
        <button onClick={fetchByID} > Get user </button>

    </div>


}

export default FireBaseDB;