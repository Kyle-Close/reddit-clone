import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';

export async function createNewUser(auth, email, password) {
	try {
		// TO DO
		// 1. Check if user name exists in cloud user database
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		// 2. Add user to user name database on cloud
		console.log('User added to database');
		return true;
	} catch (error) {
		const errorMessage = error.message;
		return errorMessage;
	}
}

export async function signInUser(auth, email, password) {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		return true;
	} catch (error) {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.log(errorMessage);
		return false;
	}
}

export function monitorAuthState(auth, callbackFn) {
	onAuthStateChanged(auth, callbackFn);
}

export async function logout(auth) {
	await signOut(auth);
}
