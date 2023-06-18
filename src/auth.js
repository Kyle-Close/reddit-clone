import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { auth } from './firebase'

monitorAuthState(auth, callbackFn)

function callbackFn(user){
    console.log(user)
}

export async function createNewUser(auth, email, password){
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        console.log(user)
    }catch (error){
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
    }
}

export async function signInUser(auth, email, password){
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
        console.log(user)
    }catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
    }
}

export function monitorAuthState(auth, callbackFn){
    onAuthStateChanged(auth, callbackFn)
}

export async function logout(auth){
    await signOut(auth);
  }

