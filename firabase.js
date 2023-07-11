import { initializeApp } from 'firebase/app';
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB6byZHj0yv6wVeI8fUrFJ9Yf9d8MMW3xY",
    authDomain: "hornetpro-3dda0.firebaseapp.com",
    projectId: "hornetpro-3dda0",
    storageBucket: "hornetpro-3dda0.appspot.com",
    messagingSenderId: "935147079897",
    appId: "1:935147079897:web:3c980582a93c52b859d6c8",
    measurementId: "G-GBVNM7B8TL"
};

export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)

