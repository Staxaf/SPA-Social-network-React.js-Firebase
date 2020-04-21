import * as firebase from "firebase";


const config = {
    apiKey: "AIzaSyAVqntvEOYxFeOkhpzdHc6PO4fZuSrfzvg",
    authDomain: "social-network-react-redux.firebaseapp.com",
    databaseURL: "https://social-network-react-redux.firebaseio.com",
    projectId: "social-network-react-redux",
    storageBucket: "social-network-react-redux.appspot.com",
    messagingSenderId: "419369044262",
    appId: "1:419369044262:web:41b557998d41d21ec559e7"
};
// Initialize Firebase
firebase.initializeApp(config);

export default firebase