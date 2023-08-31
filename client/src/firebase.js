import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAJ8s9nsdNY9RN2lUXgpbtpQZMUiZ4qn5k",
    authDomain: "fir-32eca.firebaseapp.com",
    projectId: "fir-32eca",
    storageBucket: "fir-32eca.appspot.com",
    messagingSenderId: "226704490385",
    appId: "1:226704490385:web:842a2bd1edbbbea542e430",
    measurementId: "G-PXF5193LEE"
};


const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
export const storage = getStorage(app)

export default app