import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'

export async function createNewUser(auth, email, password){
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
    }catch (error){
        const errorCode = error.code;
        const errorMessage = error.message;
    }
}

export async function signInUser(auth, email, password){
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
    }catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
    }
}

export function monitorAuthState(auth, callbackFn){
    onAuthStateChanged(auth, callbackFn)
}

export async function logout(auth){
    await signOut(auth);
  }

