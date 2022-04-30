import { initializeApp } from "firebase/app";
import { connectDatabaseEmulator, getDatabase } from "firebase/database"
import { getAuth, onAuthStateChanged, FacebookAuthProvider, signInWithCredential, connectAuthEmulator } from "firebase/auth"
import { getStorage, connectStorageEmulator } from "firebase/storage"
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyC8jIat4ZK5TxB7OfJCN-rOPR-RkVQKqes",
    authDomain: "projectxxx-62f3c.firebaseapp.com",
    projectId: "projectxxx-62f3c",
    storageBucket: "projectxxx-62f3c.appspot.com",
    messagingSenderId: "658765677344",
    appId: "1:658765677344:web:ca92c84152d13846050d45",
    measurementId: "G-5668Z83GRZ"
};


const app = initializeApp(firebaseConfig);
export const firestore = getDatabase()
export const authentication = getAuth()
export const storage = getStorage()
try {
    if (process.env.NODE_ENV != "development" || process.env.NODE_ENV == "development" || process.env.NODE_ENV == undefined) connectDatabaseEmulator(firestore, "localhost", 9001)
    if (process.env.NODE_ENV != "development" || process.env.NODE_ENV == "development" || process.env.NODE_ENV == undefined) connectAuthEmulator(authentication, "http://localhost:9098")
    if (process.env.NODE_ENV != "development" || process.env.NODE_ENV == "development" || process.env.NODE_ENV == undefined) connectStorageEmulator(storage, "localhost", 9199)
} catch (e) {

}
const analytics = (async () => {
    if (await isSupported()) {
        getAnalytics(app);
    }
})()