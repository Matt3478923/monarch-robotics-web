import firebase from  'firebase/compat/app'
import 'firebase/compat/auth'

const app = firebase.initializeApp({
    apiKey: "AIzaSyDZDhREBZZ7iQ7HlaotqDiMM_fl3IWqoAU",
    authDomain: "monarch-robotics-web-apps.firebaseapp.com",
    projectId: "monarch-robotics-web-apps",
    storageBucket: "monarch-robotics-web-apps.appspot.com",
    messagingSenderId: "526456036878",
    appId: "1:526456036878:web:4616133b243da990da265f"
})

export const auth = app.auth()
export default app