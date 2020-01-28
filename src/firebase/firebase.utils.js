import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {

    apiKey: "AIzaSyABNUEUI3n-gMjSHOzzVqWTI9u80zTQqD0",
    authDomain: "sv-clothing-db.firebaseapp.com",
    databaseURL: "https://sv-clothing-db.firebaseio.com",
    projectId: "sv-clothing-db",
    storageBucket: "sv-clothing-db.appspot.com",
    messagingSenderId: "624742532737",
    appId: "1:624742532737:web:6d5be4487f0233db45af80",
    measurementId: "G-HVZHZRZ0R5"

};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch(error){
                console.log('error creating user', error.message);
        }
        
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
