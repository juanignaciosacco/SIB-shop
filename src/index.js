import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { v4 } from 'uuid';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4kBiGgKHMvSJTC6amlAG7sEsZ6CH_Bro",
  authDomain: "sib-e-commerce.firebaseapp.com",
  projectId: "sib-e-commerce",
  storageBucket: "sib-e-commerce.appspot.com",
  messagingSenderId: "395740073902",
  appId: "1:395740073902:web:b097405b74fc12ba34423f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

export async function deletFile(file) {
  const desertRef = ref(storage, file)
  await deleteObject(desertRef).then(() => {
    console.log("Se borro la imagen exitosamente")
  }).catch((error) => {
    console.log(error)
  })
}

export async function uploadFile(file) {
  const storageRef = ref(storage, file.name)
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return url
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
