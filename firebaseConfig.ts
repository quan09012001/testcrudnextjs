// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBR_29zTIWu_kyeZy8_T66RoYa-DofpTgY",
    authDomain: "upload-img-4d7f4.firebaseapp.com",
    projectId: "upload-img-4d7f4",
    storageBucket: "upload-img-4d7f4.appspot.com",
    messagingSenderId: "1003177370909",
    appId: "1:1003177370909:web:311f23f539710e865a6df4"
  };

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);


